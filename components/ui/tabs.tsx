import { cn } from "@/utils/utils";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

interface TabsProps extends React.ComponentProps<typeof View> {
  defaultValue: string;
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ defaultValue, className, children }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <View className={cn("flex-1", className)}>{children}</View>
    </TabsContext.Provider>
  );
};

interface TabsListProps extends React.ComponentProps<typeof View> {
  children: React.ReactNode;
}

const TabsList: React.FC<TabsListProps> = ({ className, children }) => (
  <View className={cn("flex-row justify-around border-b border-border -mx-4", className)}>
    {children}
  </View>
);

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children }) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext)!;
  const isActive = activeTab === value;

  return (
    <TouchableOpacity
      onPress={() => setActiveTab(value)}
      className={cn(
        "flex-1 py-2 border-b-2",
        isActive ? "border-primary" : "border-transparent"
      )}
      activeOpacity={0.8}
    >
      <Text
        className={cn(
          "text-center text-sm",
          isActive ? "text-primary font-semibold" : "text-foreground"
        )}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

const TabsContent: React.FC<TabsContentProps> = ({ value, children }) => {
  const { activeTab } = React.useContext(TabsContext)!;
  return activeTab === value ? children : null;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
