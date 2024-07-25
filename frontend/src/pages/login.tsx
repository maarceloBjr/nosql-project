import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import Box from "@/components/Box";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleSignIn = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/login", { email, password });
        console.log("Login bem-sucedido:", response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } catch (error: any) {
        console.error("Erro ao fazer login:", error);
      }
    };
  
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Box className="w-2/4 h-2/4 flex">
          <div className="flex-1 p-4 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-14">SuuS</h1>
            <Input
              type="email"
              placeholder="Email"
              className="w-2/3 mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              className="w-2/3 mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="outline" onClick={handleSignIn}>
              Sign in
            </Button>
          </div>
          <div className="flex-1 p-4">
            <img
              src="https://c.tenor.com/5Y9gxegWroAAAAAd/tenor.gif"
              alt="SuuS"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </Box>
      </div>
    );
  }

export default Login;
