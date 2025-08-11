import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      role: "admin" | "manager" | "director" | "agent";
      email: string;
      token: string;
      avatar: string;
    };
  }
}
