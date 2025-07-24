"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  GetUserProfileData,
  ProfileDataType,
  UpdateUserProfileData,
} from "@/lib/db/dashboard/settings/ProfileDataQueries";
import { useEffect, useState } from "react";

export default function ProfileSettingsCard() {
  const [profileData, setProfileData] = useState<ProfileDataType>({
    display_name: "",
    id: "",
    age: 0,
    calorie_target: 0,
    created_at: "",
    email: "",
    gender: "",
    goal_weight: 0,
    weight_kg: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfileData = async () => {
      const data = await GetUserProfileData();
      setProfileData(data);
    };
    fetchUserProfileData();
  }, []);

  const handleUpdateDataClick = async () => {
    try {
      setLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { email, ...profileDataWithoutEmail } = profileData;
      await UpdateUserProfileData(profileDataWithoutEmail);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="grow grid gap-2">
            <Label htmlFor="nameInput">Name</Label>
            <Input
              id="nameInput"
              type="text"
              placeholder="User name"
              value={profileData?.display_name}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  display_name: e.target.value,
                });
              }}
              required
            />
          </div>
          <div className="grow grid gap-2">
            <Label htmlFor="emailInput">Email</Label>
            <Input
              id="emailInput"
              type="email"
              placeholder="User email"
              disabled
              defaultValue={profileData?.email}
              required
            />
          </div>
          <div className="grow flex gap-4">
            <div className="grow grid gap-2">
              <Label htmlFor="ageInput">Age</Label>
              <Input
                id="ageInput"
                type="number"
                placeholder="Your name"
                value={profileData?.age === null ? "0" : profileData.age}
                onChange={(e) => {
                  setProfileData({
                    ...profileData,
                    age: Number(e.target.value),
                  });
                }}
                required
              />
            </div>
            <div className="grow grid gap-2">
              <Label htmlFor="genderInput">Gender</Label>
              <ToggleGroup
                type="single"
                variant="outline"
                id="genderInput"
                className="w-full overflow-x-auto"
                value={profileData?.gender}
                onValueChange={(e) => {
                  setProfileData({ ...profileData, gender: e });
                }}
              >
                <ToggleGroupItem value="Male" aria-label="Toggle bold">
                  <p>Male</p>
                </ToggleGroupItem>
                <ToggleGroupItem value="Female" aria-label="Toggle italic">
                  <p>Female</p>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="grow grid gap-2">
              <Label htmlFor="currentWeightInput">Current Weight</Label>
              <Input
                id="currentWeightInput"
                type="number"
                placeholder="Your name"
                value={
                  profileData?.weight_kg === null ? 0 : profileData.weight_kg
                }
                onChange={(e) => {
                  setProfileData({
                    ...profileData,
                    weight_kg: Number(e.target.value),
                  });
                }}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <Button
              className="w-full"
              disabled={loading}
              onClick={handleUpdateDataClick}
            >
              {loading ? "Updating..." : "Update Information"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
