interface Contact {
  id: string;
  name: string;
  company?: string;
  stage: string;
  created_at: string;
  last_contacted?: string;
  next_followup?: string;
  engagement_score?: number;
}

interface Interaction {
  id: string;
  contact_id: string;
  type: string;
  date: string;
  created_at: string;
}

/**
 * Calculate engagement score for a contact based on interactions and activity
 * Algorithm:
 * - Recent interaction (within 30 days): +3 points
 * - Interaction frequency: +1 per interaction in last 90 days
 * - Has upcoming follow-up: +2 points
 * - Email/Call interaction: +2 points vs +1 for notes
 * - Max score: 10 points
 */
export const calculateEngagementScore = (
  contact: Contact,
  interactions: Interaction[]
): number => {
  let score = 0;
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

  // Filter interactions for this contact
  const contactInteractions = interactions.filter(i => i.contact_id === contact.id);

  // Recent interaction (within 30 days): +3 points
  const hasRecentInteraction = contactInteractions.some(i => {
    const interactionDate = new Date(i.date);
    return interactionDate >= thirtyDaysAgo;
  });
  if (hasRecentInteraction) score += 3;

  // Interaction frequency in last 90 days: +1 per interaction (max 3)
  const recentInteractions = contactInteractions.filter(i => {
    const interactionDate = new Date(i.date);
    return interactionDate >= ninetyDaysAgo;
  });
  score += Math.min(recentInteractions.length, 3);

  // Has upcoming follow-up: +2 points
  if (contact.next_followup) {
    const followupDate = new Date(contact.next_followup);
    if (followupDate >= now) score += 2;
  }

  // High-value interaction types: +2 for email/call vs +1 for notes
  const highValueInteractions = contactInteractions.filter(i => 
    i.type === 'Email' || i.type === 'Call'
  ).length;
  score += Math.min(highValueInteractions, 2);

  // Cap at 10
  return Math.min(score, 10);
};

/**
 * Get engagement tier based on score
 * A (8-10), B (5-7), C (2-4), D (0-1)
 */
export const getEngagementTier = (score: number): string => {
  if (score >= 8) return 'A';
  if (score >= 5) return 'B';
  if (score >= 2) return 'C';
  return 'D';
};

/**
 * Calculate conversion rates between stages
 */
export const calculateConversionRates = (contacts: Contact[]) => {
  const stages = ['Lead', 'Prospect', 'Proposal', 'Contract', 'Client'];
  const stageCounts: Record<string, number> = {};
  
  stages.forEach(stage => {
    stageCounts[stage] = contacts.filter(c => c.stage === stage).length;
  });

  return stages.map((stage, idx) => {
    const count = stageCounts[stage];
    let conversionRate = undefined;
    
    if (idx > 0) {
      const prevCount = stageCounts[stages[idx - 1]];
      conversionRate = prevCount > 0 ? Math.round((count / prevCount) * 100) : 0;
    }
    
    return { stage, count, conversionRate };
  });
};

/**
 * Calculate average deal velocity (time in each stage)
 */
export const calculateDealVelocity = (contacts: Contact[], stages?: string[]) => {
  const defaultStages = ['Lead', 'Prospect', 'Proposal', 'Contract'];
  const velocityStages = stages || defaultStages;
  
  // Simplified calculation based on current stage and creation date
  const velocityData = velocityStages.map(stage => {
    const stageContacts = contacts.filter(c => c.stage === stage);
    
    if (stageContacts.length === 0) {
      return { stage, avgDays: 0 };
    }

    const totalDays = stageContacts.reduce((sum, contact) => {
      const created = new Date(contact.created_at);
      const now = new Date();
      const days = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
      return sum + days;
    }, 0);

    const avgDays = Math.round(totalDays / stageContacts.length);
    return { stage, avgDays };
  });

  return velocityData;
};

/**
 * Group projects by service type and calculate profitability metrics
 */
interface Project {
  id: string;
  name: string;
  type: string;
  project_value_kr: number;
  actual_hours?: number;
  hourly_rate?: number;
  status: string;
}

export const groupProjectsByServiceType = (projects: Project[]) => {
  const serviceTypes: Record<string, {
    projectCount: number;
    totalRevenue: number;
    estimatedHours: number;
    actualHours: number;
    totalCosts: number;
  }> = {};

  projects.forEach(project => {
    const serviceType = project.type || 'Unspecified';
    const hourlyRate = project.hourly_rate || 1500;
    const revenue = project.project_value_kr || 0;
    const estimatedHours = revenue / hourlyRate;
    const actualHours = project.actual_hours || 0;
    const costs = actualHours * hourlyRate * 0.7; // Assuming 70% cost ratio

    if (!serviceTypes[serviceType]) {
      serviceTypes[serviceType] = {
        projectCount: 0,
        totalRevenue: 0,
        estimatedHours: 0,
        actualHours: 0,
        totalCosts: 0,
      };
    }

    serviceTypes[serviceType].projectCount++;
    serviceTypes[serviceType].totalRevenue += revenue;
    serviceTypes[serviceType].estimatedHours += estimatedHours;
    serviceTypes[serviceType].actualHours += actualHours;
    serviceTypes[serviceType].totalCosts += costs;
  });

  return Object.entries(serviceTypes).map(([serviceType, data]) => {
    const profitMargin = data.totalRevenue > 0 
      ? Math.round(((data.totalRevenue - data.totalCosts) / data.totalRevenue) * 100)
      : 0;
    
    const utilization = data.estimatedHours > 0 && data.actualHours > 0
      ? Math.round((data.actualHours / data.estimatedHours) * 100)
      : 0;

    return {
      serviceType,
      projectCount: data.projectCount,
      totalRevenue: data.totalRevenue,
      estimatedHours: Math.round(data.estimatedHours),
      actualHours: Math.round(data.actualHours),
      profitMargin,
      utilization,
    };
  });
};
