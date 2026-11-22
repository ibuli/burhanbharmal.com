export interface Enquiry {
  name: string;
  email: string;
  details: string;
  service: string;
  timeline: string;
}
export function prepareEnquiry(email: string, input: Enquiry) {
  const subject = `Project enquiry: ${input.service || 'Let’s talk'}`;
  const body = [
    `Hi Burhan,`,
    `I’m ${input.name}.`,
    `What I’m working on:\n${input.details}`,
    `Type of help: ${input.service || 'I’d like your advice on the right approach.'}`,
    ...(input.timeline ? [`Timing: ${input.timeline}`] : []),
    `You can reach me at ${input.email}.`,
    `Thanks,\n${input.name}`,
  ].join('\n\n');
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
