import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactId: string | null;
  contactEmail?: string;
  contactName?: string;
}

const EmailModal = ({ isOpen, onClose, contactId, contactEmail, contactName }: EmailModalProps) => {
  const [template, setTemplate] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const templates = {
    "follow-up": {
      subject: "Following up on our conversation",
      body: `Hi ${contactName || "there"},\n\nI wanted to follow up on our recent conversation.\n\nLooking forward to hearing from you.\n\nBest regards`
    },
    "meeting": {
      subject: "Meeting Request",
      body: `Hi ${contactName || "there"},\n\nI'd like to schedule a meeting to discuss how we can help with your needs.\n\nPlease let me know your availability.\n\nBest regards`
    },
    "proposal": {
      subject: "Proposal for Your Consideration",
      body: `Hi ${contactName || "there"},\n\nAttached is our proposal for the project we discussed.\n\nI'm happy to answer any questions you may have.\n\nBest regards`
    }
  };

  const handleTemplateChange = (templateKey: string) => {
    setTemplate(templateKey);
    if (templateKey && templates[templateKey as keyof typeof templates]) {
      const t = templates[templateKey as keyof typeof templates];
      setSubject(t.subject);
      setBody(t.body);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactId) return;

    setSending(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          contactId,
          subject,
          body,
          fromEmail: session.user.email,
        },
      });

      if (error) throw error;

      toast({
        title: "Email sent",
        description: `Email sent to ${contactName || contactEmail}`,
      });

      setSubject("");
      setBody("");
      onClose();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to send email",
        description: error.message || "Please try again",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Send Email to {contactName || contactEmail}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <Label htmlFor="template">Email Template</Label>
            <Select value={template} onValueChange={handleTemplateChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="follow-up">Follow-up</SelectItem>
                <SelectItem value="meeting">Meeting Request</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="to">To</Label>
            <Input id="to" value={contactEmail} disabled />
          </div>

          <div>
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="Meeting follow-up"
            />
          </div>

          <div>
            <Label htmlFor="body">Message *</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={12}
              placeholder="Hi there,&#10;&#10;It was great meeting you..."
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose} disabled={sending}>
              Cancel
            </Button>
            <Button type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send Email"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailModal;
