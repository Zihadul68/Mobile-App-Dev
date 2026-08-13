import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { useDebounce } from "../hooks/use-debounce";

export type SearchBarHandle = {
  focus: () => void;
  clear: () => void;
};

type SearchBarProps = Omit<TextInputProps, "value" | "onChangeText"> & {
  value: string;
  onChangeText: (value: string) => void;
  debounceDelay?: number;
};

const SearchBar = forwardRef<SearchBarHandle, SearchBarProps>(
  ({ value, onChangeText, debounceDelay = 300, ...props }, ref) => {
    const inputRef = useRef<TextInput>(null);
    const [localValue, setLocalValue] = useState(value);

    const debouncedValue = useDebounce(localValue, debounceDelay);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => {
        setLocalValue("");
        onChangeText("");
      },
    }), [onChangeText]);

    React.useEffect(() => {
      if (debouncedValue !== value) {
        onChangeText(debouncedValue);
      }
    }, [debouncedValue, value, onChangeText]);

    React.useEffect(() => {
      setLocalValue(value);
    }, [value]);

    return (
      <View style={styles.container}>
        <TextInput
          ref={inputRef}
          value={localValue}
          onChangeText={setLocalValue}
          placeholder="Search students..."
          autoCapitalize="none"
          style={styles.input}
          {...props}
        />
      </View>
    );
  }
);

SearchBar.displayName = "SearchBar";

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
});

export default SearchBar;