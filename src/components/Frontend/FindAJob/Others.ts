export const salaryRanges = [
    { label: "0-20k", value: "0-20k" },
    { label: "20k-40k", value: "20k-40k" },
    { label: "40k-60k", value: "40k-60k" },
    { label: "60k-80k", value: "60k-80k" },
    { label: "80k-100k", value: "80k-100k" },
    { label: "100k-200K", value: "100k-200k" },
    { label: "200K+", value: "200k+" },
];

export const jobTypesOptions = [
    "None",
    "Contract",
    "Freelance",
    "Full time",
    "Internship",
    "Part time",
    "Spot job"
].map(option => ({ label: option, value: option }));