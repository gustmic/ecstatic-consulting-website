import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Testimonial {
  id?: string;
  client_name: string;
  client_title: string;
  client_company: string;
  quote: string;
  service_area: string;
  is_featured: boolean;
  image_url?: string;
  logo_url?: string;
}

interface TestimonialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (testimonial: Testimonial) => void;
  testimonial?: Testimonial;
}

const TestimonialModal = ({ open, onOpenChange, onSave, testimonial }: TestimonialModalProps) => {
  const [formData, setFormData] = useState<Testimonial>(
    testimonial || {
      client_name: "",
      client_title: "",
      client_company: "",
      quote: "",
      service_area: "Strategy",
      is_featured: false,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{testimonial ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
          <DialogDescription>
            {testimonial ? "Update testimonial information" : "Create a new client testimonial"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client_name">Client Name *</Label>
              <Input
                id="client_name"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client_title">Title</Label>
              <Input
                id="client_title"
                value={formData.client_title}
                onChange={(e) => setFormData({ ...formData, client_title: e.target.value })}
                placeholder="e.g., CEO"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="client_company">Company *</Label>
            <Input
              id="client_company"
              value={formData.client_company}
              onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service_area">Service Area *</Label>
            <Select 
              value={formData.service_area} 
              onValueChange={(value) => setFormData({ ...formData, service_area: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select service area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Strategy">Strategy</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote">Testimonial Quote *</Label>
            <Textarea
              id="quote"
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              placeholder="Enter the client's testimonial..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="image_url">Client Photo URL</Label>
              <Input
                id="image_url"
                value={formData.image_url || ""}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="logo_url">Company Logo URL</Label>
              <Input
                id="logo_url"
                value={formData.logo_url || ""}
                onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_featured"
              checked={formData.is_featured}
              onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
            />
            <Label htmlFor="is_featured">Featured Testimonial</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {testimonial ? "Update" : "Create"} Testimonial
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialModal;
