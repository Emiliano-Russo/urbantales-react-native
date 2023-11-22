import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const questionsAnswers = [
  {
    question: "How do I share a story on the map?",
    answer:
      "You have to click on the button at the bottom that says narrate and then select a location on the map, then click on share.",
  },
  {
    question: "Can I edit a story after posting it?",
    answer: "You cannot modify a story once it has been uploaded, this is for security reasons",
  },
  {
    question: "How do I delete a story?",
    answer:
      "To delete a story, go to the story details page and click on the dots to display options and you will see the delete button.",
  },
  {
    question: "How do I report a story?",
    answer:
      "To delete a story, go to the story details page and click on the dots to display options and you will see the report button.",
  },
  {
    question: "How do I change my profile picture?",
    answer: "We do not handle profile pictures!",
  },
  {
    question: "How do I change my email?",
    answer:
      "You have to go to settings and edit user, you will see an option to request a change of email, and a mail will be sent to your email address just follow the instructions from there.",
  },
  {
    question: "How do I change my password?",
    answer:
      "You have to go to settings and edit user, you will see an option to request a change of password, and a mail will be sent to your email address just follow the instructions from there.",
  },
  {
    question: "How do I change my language?",
    answer: "In the settings language option",
  },
];

export const Support = () => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const toggleQuestion = (index) => {
    if (selectedQuestionIndex === index) {
      setSelectedQuestionIndex(null);
    } else {
      setSelectedQuestionIndex(index);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {questionsAnswers.map((qa, index) => (
        <View key={index}>
          <TouchableOpacity onPress={() => toggleQuestion(index)} style={styles.questionContainer}>
            <Text style={styles.questionText}>{qa.question}</Text>
          </TouchableOpacity>
          {selectedQuestionIndex === index && <Text style={styles.answerText}>{qa.answer}</Text>}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    flex: 1,
  },
  questionContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
  },
  questionText: {
    fontWeight: "bold",
  },
  answerText: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
});
