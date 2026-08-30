export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const CATEGORY_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'AI & Data', value: 'ai-data' },
  { label: 'Development', value: 'development' },
  { label: 'Cloud & DevOps', value: 'cloud-devops' },
  { label: 'Testing', value: 'testing' },
  { label: 'Enterprise', value: 'enterprise' },
  { label: 'Marketing', value: 'marketing' },
];

export const RESOURCE_CATEGORIES = [
  'All',
  'AI',
  'Data',
  'Development',
  'Cloud',
  'Career',
  'Interview Preparation',
];

export const CONTACT_INFO = {
  phone: '+91 XXXXX XXXXX',
  email: 'info@fuzenit.com',
  whatsapp: '+91 XXXXX XXXXX',
  address: 'Office address placeholder',
};

export const SITE_URL = 'https://fuzenit.com';
