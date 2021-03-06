import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import { useQuery, gql } from "@apollo/client";
const allStations = require("../../MTA/stations");

const STATION_ALERTS = gql`
  query StationAlert($stationId: String!) {
    elevatorAlert(stationId: $stationId) {
      station
      borough
      trainno
      equipment
      equipmenttype
      serving
      ADA
      outagedate
      estimatedreturntoservice
      reason
      isupcomingoutage
      ismaintenanceoutage
    }
  }
`;

export default function StationAlerts({ station }) {
  const [alerts, setAlerts] = useState([]);

  const { data, loading, error } = useQuery(STATION_ALERTS, {
    variables: { stationId: station },
  });

  if (loading) return <Text style={styles.alertContent}>Loading...</Text>;
  if (error) console.log("Error ", error);

  const { elevator, escalator } = data ? groupAlerts(data.elevatorAlert) : [];

  if (!allStations[station].accessible) return null;
  if (elevator.length === 0 && escalator.length === 0)
    return (
      <Text style={styles.alertContent}>
        Station elevators and escalators are currently operating
      </Text>
    );

  return (
    <View style={styles.alertsContainer}>
      {elevator && elevator.length > 0 ? (
        <Text style={styles.alert}>Elevator Alerts</Text>
      ) : null}
      {elevator && elevator.length > 0
        ? elevator.map((alert, i) => (
            <View style={styles.alertLi} key={`esc_${station}-${i}`}>
              <Text style={styles.alert}>{"• "}</Text>
              <Text style={styles.alertContent}>{alert}</Text>
            </View>
          ))
        : null}
      {escalator && escalator.length > 0 ? (
        <Text style={styles.alert}>Escalator Alerts</Text>
      ) : null}
      {escalator && escalator.length > 0
        ? escalator.map((alert, i) => (
            <View style={styles.alertLi} key={`esc_${station}-${i}`}>
              <Text style={styles.alert}>{"• "}</Text>
              <Text style={styles.alertContent}>{alert}</Text>
            </View>
          ))
        : null}
    </View>
  );
}

const groupAlerts = (data) => {
  let elevator = [];
  let escalator = [];
  for (let i = 0; i < data.length; i++) {
    data[i].equipmenttype === "ES"
      ? escalator.push(data[i].serving)
      : elevator.push(data[i].serving);
  }
  return { elevator, escalator };
};

const styles = StyleSheet.create({
  alertsContainer: {
    backgroundColor: "#000",
    padding: "2%",
    color: "#eeff00",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  alertLi: {
    display: "flex",
    flexDirection: "row",
  },
  alert: {
    fontWeight: "bold",
    color: "#eeff00",
  },
  alertContent: {
    fontWeight: "normal",
    color: "#eeff00",
  },
});
