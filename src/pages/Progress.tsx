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
      status: "complete",
      items: [
        { done: true, text: "Summary cards (Contacts, Projects, Pipeline, Next Follow-Up)" },
        { done: true, text: "Pipeline value weighted calculation" },
        { done: true, text: "Upcoming follow-ups table with overdue detection" },
        { done: true, text: "Complete/Snooze/Email actions on follow-ups" },
        { done: true, text: "Recent activity feed (last 10 interactions)" },
        { done: true, text: "Swedish number formatting (1 200 000 kr)" },
        { done: true, text: "Swedish date formatting (14 dec 2025)" },
        { done: true, text: "Revenue projection chart (6-month stacked bar)" },
        { done: true, text: "Chart tooltips with breakdown" },
      ]
    },
    {
      title: "4. Contacts Page",
      status: "complete",
      items: [
        { done: true, text: "Table view with columns (Name, Company, Stage, Email, Tags, etc.)" },
        { done: true, text: "Pipeline/Kanban view with drag-and-drop" },
        { done: true, text: "Search with fuzzy matching (Swedish characters)" },
        { done: true, text: "Filters (Stage, Tags, Follow-Up Status, Company)" },
        { done: true, text: "Bulk actions (Add Tag, Change Stage, Delete)" },
        { done: true, text: "Export to CSV with Swedish formatting" },
        { done: true, text: "Add/Edit contact modal" },
        { done: true, text: "Contact detail modal with interaction timeline" },
        { done: true, text: "Inline editing for basic fields" },
      ]
    },
    {
      title: "5. Projects Page",
      status: "complete",
      items: [
        { done: true, text: "Projects table view" },
        { done: true, text: "Add/Edit project modal" },
        { done: true, text: "Client selection from contacts" },
        { done: true, text: "Project type selection (Strategy/Technical/Data)" },
        { done: true, text: "Date range validation" },
        { done: true, text: "Revenue tracking" },
        { done: true, text: "Project status management" },
      ]
    },
    {
      title: "6. Email Integration (Resend)",
      status: "complete",
      items: [
        { done: true, text: "Send email edge function" },
        { done: true, text: "Email compose modal" },
        { done: true, text: "Auto-log interaction when email sent" },
        { done: true, text: "Update last_contacted date" },
        { done: true, text: "Email templates for common scenarios" },
        { done: true, text: "Success/error toast notifications" },
      ]
    },
    {
      title: "7. Settings Page",
      status: "complete",
      items: [
        { done: true, text: "Manage stages and probabilities" },
        { done: true, text: "Manage service types" },
        { done: true, text: "Tag management" },
        { done: true, text: "User preferences (view, notifications, format)" },
      ]
    },
    {
      title: "8. UI/UX Polish",
      status: "complete",
      items: [
        { done: true, text: "Responsive mobile design" },
        { done: true, text: "Loading states and skeletons" },
        { done: true, text: "Error boundaries" },
        { done: true, text: "Keyboard shortcuts (Cmd+K search)" },
        { done: true, text: "Toast notifications for all actions" },
        { done: true, text: "Confirmation dialogs for destructive actions" },
        { done: true, text: "Empty states with helpful CTAs" },
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

          <Card className="p-6 mt-8 bg-green-500/10 border-green-500/20">
            <h3 className="font-semibold mb-2 text-green-700 dark:text-green-400">🎉 100% Complete!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The complete CRM/PSA system is built and ready for production use.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mb-4">
              <li>Full contact management with kanban, table views, and bulk actions</li>
              <li>Project tracking with revenue forecasting and Swedish formatting</li>
              <li>Email integration with templates and auto-logging</li>
              <li>Configurable settings for stages, service types, and tags</li>
              <li>Global search with Cmd/Ctrl+K shortcut</li>
              <li>Error boundaries for production reliability</li>
            </ul>
            <div className="bg-background/50 rounded p-4 border">
              <p className="text-sm font-medium mb-2">🚀 Next Steps:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Visit <code className="bg-muted px-1 rounded">/admin/setup</code> to initialize admin user</li>
                <li>Configure RESEND_API_KEY secret for email functionality</li>
                <li>Verify sender domain at resend.com</li>
                <li>Start adding contacts and projects!</li>
              </ol>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Progress;
