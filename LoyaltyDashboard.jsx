import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LoyaltyDashboard() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    date: "",
    description: "",
    containers: 0,
    upfront: 0,
    launch: 0,
    tier: ""
  });

  const calculatePoints = (entry) => {
    let points = entry.containers * 100;
    if (entry.upfront) points += 150;
    if (entry.launch) points += 200;
    if (entry.tier === "15" || entry.tier === "30") points += 500;
    return points;
  };

  const handleSubmit = () => {
    const newEntry = { ...form, points: calculatePoints(form) };
    setEntries([...entries, newEntry]);
    setForm({ date: "", description: "", containers: 0, upfront: 0, launch: 0, tier: "" });
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Al-Matuco Plus Loyalty Dashboard</h1>
      <Card className="mb-6">
        <CardContent className="space-y-2 p-4">
          <Input placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <Input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input type="number" placeholder="Containers Purchased" value={form.containers} onChange={(e) => setForm({ ...form, containers: +e.target.value })} />
          <Input type="number" placeholder="Upfront Payment (1 or 0)" value={form.upfront} onChange={(e) => setForm({ ...form, upfront: +e.target.value })} />
          <Input type="number" placeholder="Participated in Launch (1 or 0)" value={form.launch} onChange={(e) => setForm({ ...form, launch: +e.target.value })} />
          <Input placeholder="Tier Reached (15 / 30)" value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} />
          <Button onClick={handleSubmit}>Add Entry</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <Card key={index}>
            <CardContent className="p-4 space-y-1">
              <p><strong>Date:</strong> {entry.date}</p>
              <p><strong>Description:</strong> {entry.description}</p>
              <p><strong>Containers:</strong> {entry.containers}</p>
              <p><strong>Upfront:</strong> {entry.upfront ? "Yes" : "No"}</p>
              <p><strong>Launch:</strong> {entry.launch ? "Yes" : "No"}</p>
              <p><strong>Tier:</strong> {entry.tier}</p>
              <p className="text-green-600 font-bold"><strong>Points Earned:</strong> {entry.points}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
