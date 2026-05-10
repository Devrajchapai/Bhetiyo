export interface NavigationBarType {
  isConnected: boolean;
  isSigningUp: boolean;
  currentTab: string | null;

  connect: () => void;
  disconnect: () => void;
  signingUp: () => void;
  changeTab: (newTab: string) => void;
}
