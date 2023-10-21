import React from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";

interface AuthModuleProps {
  error: any; // Replace 'any' with the actual type of 'error' if known
}

const AuthModule: React.FC<AuthModuleProps> = ({ error }) => {
  return (
    <div>
      {" "}
      <Dialog defaultOpen={error?.status === 401}>
        <DialogContent>
          <Input />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthModule;
