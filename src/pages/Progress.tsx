import { CheckCircle2, Circle, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Progress = () => {
  const sections = [
    {
      title: "1. Database Schema & Setup",
      status: "complete",
      items: [
        { done: true, text: "Contacts table with RLS policies" },
        { done: true, text: "Interactions table for logging activities" },
        { done: true, text: "Projects table with client relationships" },
        { done: true, text: "Settings table for configuration" },
        { done: true, text: "Trigram indexes for Swedish name search" },
        { done: true, text: "Admin user setup (micael.gustavsson@ecstatic.consulting)" },
        { done: true, text: "Overdue follow-up triggers" },
      ]
    },
    {
      title: "2. Authentication & Navigation",
      status: "complete",
      items: [
        { done: true, text: "Admin login page" },
        { done: true, text: "Admin landing page with CRM/Blog options" },
        { done: true, text: "Session management & auth checks" },
        { done: true, text: "Role-based access with user_roles table" },
      ]
    },
    {
      title: "3. CRM Dashboard (Priority Page)",
      status: "partial",
      items: [
        { done: true, text: "Summary cards (Contacts, Projects, Pipeline, Next Follow-Up)" },
        { done: true, text: "Pipeline value weighted calculation" },
        { done: true, text: "Upcoming follow-ups table with overdue detection" },
        { done: true, text: "Complete/Snooze/Email actions on follow-ups" },
        { done: true, text: "Recent activity feed (last 10 interactions)" },
        { done: true, text: "Swedish number formatting (1 200 000 kr)" },
        { done: true, text: "Swedish date formatting (14 dec 2025)" },
        { done: false, text: "Revenue projection chart (6-month stacked bar)" },
        { done: false, text: "Chart tooltips with breakdown" },
      ]
    },
    {
      title: "4. Contacts Page",
      status: "not-started",
      items: [
        { done: false, text: "Table view with columns (Name, Company, Stage, Email, Tags, etc.)" },
        { done: false, text: "Pipeline/Kanban view with drag-and-drop" },
        { done: false, text: "Search with fuzzy matching (Swedish characters)" },
        { done: false, text: "Filters (Stage, Tags, Follow-Up Status, Company)" },
        { done: false, text: "Bulk actions (Add Tag, Change Stage, Delete)" },
        { done: false, text: "Export to CSV with Swedish formatting" },
        { done: false, text: "Add/Edit contact modal" },
        { done: false, text: "Contact detail modal with interaction timeline" },
        { done: false, text: "Inline editing for basic fields" },
      ]
    },
    {
      title: "5. Projects Page",
      status: "not-started",
      items: [
        { done: false, text: "Projects table view" },
        { done: false, text: "Add/Edit project modal" },
        { done: false, text: "Client selection from contacts" },
        { done: false, text: "Project type selection (Strategy/Technical/Data)" },
        { done: false, text: "Date range validation" },
        { done: false, text: "Revenue tracking" },
        { done: false, text: "Project status management" },
      ]
    },
    {
      title: "6. Email Integration (Resend)",
      status: "not-started",
      items: [
        { done: false, text: "Send email edge function" },
        { done: false, text: "Email compose modal" },
        { done: false, text: "Auto-log interaction when email sent" },
        { done: false, text: "Update last_contacted date" },
        { done: false, text: "Email templates for common scenarios" },
        { done: false, text: "Success/error toast notifications" },
      ]
    },
    {
      title: "7. Settings Page",
      status: "not-started",
      items: [
        { done: false, text: "Manage stages and probabilities" },
        { done: false, text: "Manage service types" },
        { done: false, text: "Tag management" },
        { done: false, text: "User preferences" },
      ]
    },
    {
      title: "8. UI/UX Polish",
      status: "not-started",
      items: [
        { done: false, text: "Responsive mobile design" },
        { done: false, text: "Loading states and skeletons" },
        { done: false, text: "Error boundaries" },
        { done: false, text: "Keyboard shortcuts (Cmd+K search)" },
        { done: false, text: "Toast notifications for all actions" },
        { done: false, text: "Confirmation dialogs for destructive actions" },
        { done: false, text: "Empty states with helpful CTAs" },
      ]
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return <Badge className="bg-green-500">Complete</Badge>;
      case "partial":
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      case "not-started":
        return <Badge variant="outline">Not Started</Badge>;
      default:
        return null;
    }
  };

  const totalItems = sections.reduce((acc, section) => acc + section.items.length, 0);
  const completedItems = sections.reduce(
    (acc, section) => acc + section.items.filter(item => item.done).length, 
    0
  );
  const progressPercent = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold mb-2">
              CRM/PSA Implementation Progress
            </h1>
            <p className="text-muted-foreground mb-6">
              Ecstatic Consulting Internal Dashboard
            </p>
            
            <Card className="p-6 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-2xl font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div 
                  className="bg-primary rounded-full h-3 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">{completedItems}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {sections.filter(s => s.status === 'partial').reduce((acc, s) => 
                      acc + s.items.filter(i => !i.done).length, 0
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-muted-foreground">
                    {totalItems - completedItems}
                  </p>
                  <p className="text-xs text-muted-foreground">Remaining</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {sections.map((section, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-2xl font-semibold">{section.title}</h2>
                  {getStatusBadge(section.status)}
                </div>
                
                <div className="space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-3">
                      {item.done ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      )}
                      <span className={item.done ? "text-foreground" : "text-muted-foreground"}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 mt-8 bg-primary/5">
            <h3 className="font-semibold mb-2">Next Steps</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Complete revenue projection chart on Dashboard</li>
              <li>Build Contacts page with table and kanban views</li>
              <li>Implement contact CRUD operations and detail modal</li>
              <li>Set up Resend email integration with auto-logging</li>
              <li>Build Projects page with full management</li>
              <li>Add Settings page for configuration</li>
              <li>Polish UI/UX with responsive design and interactions</li>
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Progress;
