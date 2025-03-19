import React, { useState, createContext, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

const GameContext = createContext();

const initialBoard = [
  ["\u265C", "\u265E", "\u265D", "\u265B", "\u265A", "\u265D", "\u265E", "\u265C"],
  ["\u265F", "\u265F", "\u265F", "\u265F", "\u265F", "\u265F", "\u265F", "\u265F"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["\u2659", "\u2659", "\u2659", "\u2659", "\u2659", "\u2659", "\u2659", "\u2659"],
  ["\u2656", "\u2658", "\u2657", "\u2655", "\u2654", "\u2657", "\u2658", "\u2656"],
];

const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(initialBoard);
  const [selected, setSelected] = useState(null);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);

  useEffect(() => {
    console.log("Game Initialized");
  }, []);

  return (
    <GameContext.Provider value={{ board, setBoard, selected, setSelected, isWhiteTurn, setIsWhiteTurn }}>
      {children}
    </GameContext.Provider>
  );
};

const ChessCell = ({ row, col, piece, handlePress, selected }) => {
  return (
    <TouchableOpacity
      style={[
        styles.cell,
        (row + col) % 2 === 0 ? styles.lightCell : styles.darkCell,
        selected?.row === row && selected?.col === col ? styles.selectedCell : {},
      ]}
      onPress={() => handlePress(row, col)}
    >
      <Text style={styles.piece}>{piece}</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <GameProvider>
      <GameScreen />
    </GameProvider>
  );
}

const GameScreen = () => {
  const navigation = useNavigation();
  const { board, setBoard, selected, setSelected, isWhiteTurn, setIsWhiteTurn } = useContext(GameContext);

  const handlePress = (row, col) => {
    const piece = board[row][col];
    if (!selected) {
      if (piece !== "" && isCorrectTurn(piece)) {
        setSelected({ row, col });
      }
    } else {
      movePiece(selected.row, selected.col, row, col);
      setSelected(null);
    }
  };

  const isCorrectTurn = (piece) => {
    return isWhiteTurn ? /\u2659|\u2656|\u2658|\u2657|\u2655|\u2654/.test(piece) : /\u265F|\u265C|\u265E|\u265D|\u265B|\u265A/.test(piece);
  };

  const movePiece = (fromRow, fromCol, toRow, toCol) => {
    let newBoard = board.map((row) => [...row]);
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = "";
    setBoard(newBoard);
    checkWin(newBoard);
    setIsWhiteTurn(!isWhiteTurn);
  };

  const checkWin = (newBoard) => {
    let whiteKing = false, blackKing = false;
    for (let row of newBoard) {
      for (let piece of row) {
        if (piece === "\u2654") whiteKing = true;
        if (piece === "\u265A") blackKing = true;
      }
    }
    if (!whiteKing) Alert.alert("Game Over", "Black Wins!");
    if (!blackKing) Alert.alert("Game Over", "White Wins!");
  };

  return (
    <ImageBackground source={require("./assets/Chess.jpg")} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.board}>
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <ChessCell key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} piece={cell} handlePress={handlePress} selected={selected} />
            ))
          )}
        </View>

        <TouchableOpacity style={styles.restartButton} onPress={() => setBoard(initialBoard)}>
          <Text style={styles.restartButtonText}>Restart Game</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.returnButton} onPress={() => navigation.navigate("AboutScreen")}>
          <Text style={styles.returnButtonText}>Exit Game</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover", justifyContent: "center", alignItems: "center" },
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  board: { width: 320, height: 320, flexWrap: "wrap", flexDirection: "row" },
  cell: { width: 40, height: 40, justifyContent: "center", alignItems: "center" },
  lightCell: { backgroundColor: "#f0d9b5" },
  darkCell: { backgroundColor: "#b58863" },
  selectedCell: { backgroundColor: "#ffcc00" },
  piece: { fontSize: 24 },
  restartButton: { marginTop: 20, paddingVertical: 12, paddingHorizontal: 24, backgroundColor: "#e74c3c", borderRadius: 8, alignItems: "center" },
  restartButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  returnButton: { marginTop: 20, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "#3498db", borderRadius: 8, alignItems: "center" },
  returnButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

