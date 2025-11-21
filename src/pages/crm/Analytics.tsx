import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CRMNav } from "@/components/crm/CRMNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Project {
  id: string;
  name: string;
  type: "Assessment" | "Pilot" | "Integration";
  pipeline_status: "Meeting Booked" | "Proposal Sent" | "Won" | "Lost";
  project_status: "Planned" | "Ongoing" | "Completed" | null;
  project_value_kr: number;
  probability_percent: number;
  start_date: string;
  end_date: string;
  created_at: string;
}

const Analytics = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [timeFilter, setTimeFilter] = useState("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
  };

  // Capacity Check
  const activeAssessments = projects.filter(
    (p) =>
      p.type === "Assessment" &&
      p.project_status === "Ongoing" &&
      new Date(p.start_date) <= new Date() &&
      new Date(p.end_date) >= new Date()
  ).length;

  const activePilots = projects.filter(
    (p) =>
      p.type === "Pilot" &&
      p.project_status === "Ongoing" &&
      new Date(p.start_date) <= new Date() &&
      new Date(p.end_date) >= new Date()
  ).length;

  const startingThisMonth = projects.filter((p) => {
    if (!p.start_date) return false;
    const startDate = new Date(p.start_date);
    const now = new Date();
    return (
      startDate.getMonth() === now.getMonth() &&
      startDate.getFullYear() === now.getFullYear()
    );
  }).length;

  // Pipeline Health
  const pipelineProjects = projects.filter(
    (p) =>
      p.pipeline_status === "Meeting Booked" ||
      p.pipeline_status === "Proposal Sent"
  );
  const pipelineValue = pipelineProjects.reduce(
    (sum, p) => sum + (p.project_value_kr * p.probability_percent) / 100,
    0
  );

  const meetingBookedCount = projects.filter(
    (p) => p.pipeline_status === "Meeting Booked"
  ).length;
  const proposalSentCount = projects.filter(
    (p) => p.pipeline_status === "Proposal Sent"
  ).length;

  // Conversion Funnel
  const totalProjects = projects.length;
  const wonCount = projects.filter((p) => p.pipeline_status === "Won").length;

  const winRate =
    totalProjects > 0 ? ((wonCount / totalProjects) * 100).toFixed(1) : "0";

  // Project Type Breakdown
  const assessmentValue = pipelineProjects
    .filter((p) => p.type === "Assessment")
    .reduce((sum, p) => sum + p.project_value_kr, 0);
  const pilotValue = pipelineProjects
    .filter((p) => p.type === "Pilot")
    .reduce((sum, p) => sum + p.project_value_kr, 0);
  const integrationValue = pipelineProjects
    .filter((p) => p.type === "Integration")
    .reduce((sum, p) => sum + p.project_value_kr, 0);

  const totalTypeValue = assessmentValue + pilotValue + integrationValue;

  return (
    <div className="min-h-screen bg-background">
      <CRMNav />

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-4xl font-bold">Analytics</h1>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last 365 days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Capacity Check */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Active Assessments
            </h3>
            <div className="text-3xl font-bold mb-2">
              {activeAssessments} / 2
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  activeAssessments >= 2 ? "bg-destructive" : "bg-primary"
                }`}
                style={{ width: `${(activeAssessments / 2) * 100}%` }}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Active Pilots
            </h3>
            <div className="text-3xl font-bold mb-2">{activePilots} / 4</div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  activePilots >= 4 ? "bg-destructive" : "bg-primary"
                }`}
                style={{ width: `${(activePilots / 4) * 100}%` }}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Starting This Month
            </h3>
            <div className="text-3xl font-bold">{startingThisMonth}</div>
            <p className="text-sm text-muted-foreground mt-2">projects</p>
          </Card>
        </div>

        {/* Pipeline Health */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Pipeline Value
            </h3>
            <div className="text-3xl font-bold">
              {pipelineValue.toLocaleString()} kr
            </div>
            <p className="text-sm text-muted-foreground mt-2">(weighted)</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Meeting Booked
            </h3>
            <div className="text-3xl font-bold">{meetingBookedCount}</div>
            <p className="text-sm text-muted-foreground mt-2">projects</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Proposal Sent
            </h3>
            <div className="text-3xl font-bold">{proposalSentCount}</div>
            <p className="text-sm text-muted-foreground mt-2">projects</p>
          </Card>
        </div>

        {/* Conversion Funnel */}
        <Card className="p-6 mb-8">
          <h2 className="font-serif text-2xl font-bold mb-6">
            Conversion Funnel
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Meeting Booked</span>
                <span className="text-muted-foreground">
                  {meetingBookedCount} projects
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-4">
                <div
                  className="bg-primary h-4 rounded-full"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Proposal Sent</span>
                <span className="text-muted-foreground">
                  {proposalSentCount} projects
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-4">
                <div
                  className="bg-primary h-4 rounded-full"
                  style={{
                    width: `${
                      totalProjects > 0
                        ? (proposalSentCount / totalProjects) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Won</span>
                <span className="text-muted-foreground">
                  {wonCount} projects
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-4">
                <div
                  className="bg-primary h-4 rounded-full"
                  style={{
                    width: `${
                      totalProjects > 0 ? (wonCount / totalProjects) * 100 : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>

          <Card className="mt-6 p-4 bg-muted">
            <p className="text-lg font-semibold">Overall Win Rate: {winRate}%</p>
          </Card>
        </Card>

        {/* Project Type Breakdown */}
        <Card className="p-6">
          <h2 className="font-serif text-2xl font-bold mb-6">
            Pipeline Value by Type
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Assessment</span>
              <span className="text-muted-foreground">
                {assessmentValue.toLocaleString()} kr (
                {totalTypeValue > 0
                  ? ((assessmentValue / totalTypeValue) * 100).toFixed(1)
                  : "0"}
                %)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Pilot</span>
              <span className="text-muted-foreground">
                {pilotValue.toLocaleString()} kr (
                {totalTypeValue > 0
                  ? ((pilotValue / totalTypeValue) * 100).toFixed(1)
                  : "0"}
                %)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Integration</span>
              <span className="text-muted-foreground">
                {integrationValue.toLocaleString()} kr (
                {totalTypeValue > 0
                  ? ((integrationValue / totalTypeValue) * 100).toFixed(1)
                  : "0"}
                %)
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
