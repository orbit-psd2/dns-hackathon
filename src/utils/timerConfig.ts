export interface TimerConfig {
  enabled: boolean;
  targetDate: Date;
  title: string;
  description: string;
}
export const timerConfig: TimerConfig = {
  enabled: true,
  targetDate: new Date("2025-07-01T12:00:00"),
  title: "OFFICIAL LAUNCH",
  description: "Dreamnity's secure middleman service is launching soon!"
};
