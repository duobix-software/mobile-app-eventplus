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
      <View className={cn(className)}>{children}</View>
    </TabsContext.Provider>
  );
};

interface TabsListProps extends React.ComponentProps<typeof View> {
  children: React.ReactNode;
}

const TabsList: React.FC<TabsListProps> = ({ className, children }) => (
  <View
    className={cn("flex-row justify-around bg-card rounded-lg p-1", className)}
  >
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
        "flex-1 rounded-lg py-2",
        isActive ? "bg-primary" : "border-transparent"
      )}
      activeOpacity={0.8}
    >
      <Text
        className={cn(
          "text-center text-sm text-foreground",
          isActive && "font-semibold text-primary-foreground"
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
