import React, { useState } from "react";
import { IUser } from "../interface";
import Box from "@/components/Box";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    level: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (value: string) => {
    setFormData({
      ...formData,
      level: parseInt(value),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center h-full w-full"
    >
      <Box className="w-3/4 h-3/4 justify-self-center">
        <div className="mb-4">
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name
          </Label>
          <Input
            placeholder="Name"
            name="name"
            className="w-1/2 mb-4"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </Label>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            className="w-1/2 mb-4"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </Label>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            className="w-1/2 mb-4"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="level"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Level
          </Label>
          <RadioGroup
            defaultValue="1"
            onValueChange={handleRadioChange}
            value={String(formData.level)}
          >
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((level) => (
                <div key={level}>
                  <RadioGroupItem
                    value={String(level)}
                    id={String(level)}
                    className="mr-2"
                  />
                  <Label className="mr-5" htmlFor={String(level)}>
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
        >
          Submit
        </button>
      </Box>
    </form>
  );
};

export default UserForm;
