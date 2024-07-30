import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Participant } from "../../components/participant";
import { styles } from "./style";
import { useState } from "react";

export default function Home() {
  const [participant, setParticipant] = useState(""); // nome do participante que será adicionado
  const [participants, setParticipants] = useState<string[]>([]); // array de participants

  function handleAddParticipant() {
    if (participants.includes(participant.trim())) {
      Alert.alert("Aviso", "Participante já cadastrado!");
      setParticipant("");
      return;
    }
    setParticipants([...participants, participant.trim()]);
    setParticipant("");
  }
  function handleParticipatRemove(name: string) {
    Alert.alert("Aviso", `Deseja remover ${name} do evento?`, [
      { text: "Não", style: "cancel" },
      { text: "Sim" },
    ]);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>

      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022.</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
          onChangeText={setParticipant}
          value={participant}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddParticipant}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={participants} // lista de participants
        keyExtractor={(item) => item} // extrato de participants
        renderItem={({ item }) => (
          <Participant
            name={item}
            onRemove={() => handleParticipatRemove(item)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text
            style={{ color: "#6b6b6b", textAlign: "center", marginTop: 20 }}
          >
            Nenhum participante cadastrado
          </Text>
        )}
      />
    </View>
  );
}
