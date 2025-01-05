import { Checkbox, Form } from "antd";

export const Benefits = [
  {
    key: "1",
    label: "Working Hours and Leave",
    children: (
      <Form.Item name={["jobBenefits", "workingHoursAndLeave"]}>
        <Checkbox.Group className="w-full grid xl:grid-cols-2 grid-cols-1 gap-2">
          <Checkbox value="More than 120 days off per year">
            More than 120 days off per year
          </Checkbox>
          <Checkbox value="Can leave the company by 17:00">
            Can leave the company by 17:00
          </Checkbox>
          <Checkbox value="Long vacations available">
            Long vacations available
          </Checkbox>
          <Checkbox value="No overtime work"> No overtime work</Checkbox>
          <Checkbox value="Maternity and paternity leave system">
            Maternity and paternity leave system
          </Checkbox>
          <Checkbox value="Two days off per week">
            Two days off per week
          </Checkbox>
          <Checkbox value="Leave the office by 5:00 p.m.">
            Leave the office by 5:00 p.m.
          </Checkbox>
          <Checkbox value="Shorter working hours OK">
            Shorter working hours OK
          </Checkbox>
          <Checkbox value="Less than 7 hours of work">
            Less than 7 hours of work
          </Checkbox>
          <Checkbox value="Remote work available">
            Remote work available
          </Checkbox>
          <Checkbox value="120 days or more per holidays">
            120 days or more per holidays
          </Checkbox>
          <Checkbox value="Monthly average overtime hours within 20 hours">
            Monthly average overtime hours within 20 hours
          </Checkbox>
          <Checkbox value="Operating hours within 7 hours">
            Operating hours within 7 hours
          </Checkbox>
          <Checkbox value="Annual holiday 120 days or more">
            Annual holiday 120 days or more
          </Checkbox>
          <Checkbox value="Continuous vacation for 5 days or more OK">
            Continuous vacation for 5 days or more OK
          </Checkbox>
          <Checkbox value="Continuous leave system for 5 days or more">
            Continuous leave system for 5 days or more
          </Checkbox>
          <Checkbox value="Continuous leave system for 2 weeks or more">
            Continuous leave system for 2 weeks or more
          </Checkbox>
          <Checkbox value="Opening time after 10 am">
            Opening time after 10 am
          </Checkbox>
          <Checkbox value="Night Shift Available">
            Night Shift Available
          </Checkbox>
        </Checkbox.Group>
      </Form.Item>
    ),
  },
  {
    key: "2",
    label: "Skill Development",
    children: (
      <Form.Item name={["jobBenefits", "skillDevelopment"]}>
        <Checkbox.Group className="w-full grid xl:grid-cols-2 grid-cols-1 gap-2">
          <Checkbox value="Training program available">
            Training program available
          </Checkbox>
          <Checkbox value="Opportunities to experience cutting-edge technology">
            Opportunities to experience cutting - edge technology
          </Checkbox>
          <Checkbox value="Qualification acquisition support and allowance">
            Qualification acquisition support and allowance
          </Checkbox>
          <Checkbox value="Acquire specialized skills">
            Acquire specialized skills
          </Checkbox>
          <Checkbox value="Language Courses"> Language Courses </Checkbox>
        </Checkbox.Group>
      </Form.Item>
    ),
  },
  {
    key: "3",
    label: "Food & Beverage",
    children: (
      <Form.Item name={["jobBenefits", "food&Beverage"]}>
        <Checkbox.Group className="w-full grid xl:grid-cols-2 grid-cols-1 gap-2">
          <Checkbox value="Lunch subsidy available">
            Lunch subsidy available
          </Checkbox>
          <Checkbox value="All-you-can-drink tea and coffee">
            All - you - can - drink tea and coffee
          </Checkbox>
          <Checkbox value="Employee cafeteria / meal assistance">
            Employee cafeteria / meal assistance
          </Checkbox>
        </Checkbox.Group>
      </Form.Item>
    ),
  },
  {
    key: "4",
    label: "Employee club, Activities, Housing & Gifts",
    children: (
      <Form.Item name={["jobBenefits", "employeeClubActivitiesHousing&Gifts"]}>
        <Checkbox.Group className="w-full grid xl:grid-cols-2 grid-cols-1 gap-2">
          <Checkbox value="Enhancement of training system">
            Enhancement of training system
          </Checkbox>
          <Checkbox value="Free dress code"> Free dress code </Checkbox>
          <Checkbox value="Training and play facilities available">
            Training and play facilities available
          </Checkbox>
          <Checkbox value="Good Office environment">
            Good Office environment
          </Checkbox>
          <Checkbox value="There is an office tour">
            There is an office tour
          </Checkbox>
          <Checkbox value="Overseas Tour"> Overseas Tour </Checkbox>
          <Checkbox value="Freedom of clothing"> Freedom of clothing </Checkbox>
          <Checkbox value="Company housing"> Company housing </Checkbox>
          <Checkbox value="Company Apartments"> Company Apartments </Checkbox>
          <Checkbox value="Qualification for support system">
            Qualification for support system
          </Checkbox>
          <Checkbox value="Smoking Zone"> Smoking Zone </Checkbox>
          <Checkbox value="Multiple Smoking Zone">
            Multiple Smoking Zone
          </Checkbox>
          <Checkbox value="There are various events">
            There are various events
          </Checkbox>
          <Checkbox value="Company Picnic"> Company Picnic </Checkbox>
          <Checkbox value="Annual Picnic"> Annual Picnic </Checkbox>
          <Checkbox value="Every month Team Outing Dinner">
            Every month Team Outing Dinner
          </Checkbox>
          <Checkbox value="Many of the managers are well-known people">
            Many of the managers are well - known people
          </Checkbox>
        </Checkbox.Group>
      </Form.Item>
    ),
  },
  {
    key: "5",
    label: "Requirement Flexibility",
    children: (
      <Form.Item name={["jobBenefits", "requirementFlexibility"]}>
        <Checkbox.Group className="w-full grid xl:grid-cols-2 grid-cols-1 gap-2">
          <Checkbox value="Management experience welcome">
            Management experience welcome
          </Checkbox>
          <Checkbox value="No academic background required">
            No academic background required
          </Checkbox>
          <Checkbox value="No previous experience in the job market">
            No previous experience in the job market
          </Checkbox>
          <Checkbox value="No experience in the industry is welcome">
            No experience in the industry is welcome
          </Checkbox>
          <Checkbox value="Work from home OK"> Work from home OK </Checkbox>
          <Checkbox value="Regardless of the educational background">
            Regardless of the educational background
          </Checkbox>
          <Checkbox value="Inexperienced occupation welcome">
            Inexperienced occupation welcome
          </Checkbox>
          <Checkbox value="Inexperienced industry welcome">
            Inexperienced industry welcome
          </Checkbox>
          <Checkbox value="Welcome inexperienced adults">
            Welcome inexperienced adults
          </Checkbox>
          <Checkbox value="No educational background">
            No educational background
          </Checkbox>
          <Checkbox value="Inexperienced job welcome">
            Inexperienced job welcome
          </Checkbox>
          <Checkbox value="Full-time employee"> Full-time employee </Checkbox>
          <Checkbox value="Contract employee"> Contract employee </Checkbox>
          <Checkbox value="Part-time job part"> Part-time job part </Checkbox>
        </Checkbox.Group>
      </Form.Item>
    ),
  },
  {
    key: "6",
    label: "Health and Wellness",
    children: (
      <Form.Item name={["jobBenefits", "healthAndWellness"]}>
        <Checkbox.Group className="w-full grid xl:grid-cols-2 grid-cols-1 gap-2">
          <Checkbox value="There is childcare support / nursery">
            There is childcare support / nursery
          </Checkbox>
          <Checkbox value="Childcare / childcare support system">
            Childcare / childcare support system
          </Checkbox>
          <Checkbox value="Bicycle commuting is possible">
            Bicycle commuting is possible
          </Checkbox>
          <Checkbox value="Motorcycle commuting is possible">
            Motorcycle commuting is possible
          </Checkbox>
        </Checkbox.Group>
      </Form.Item>
    ),
  },
  {
    key: "7",
    label: "Healthcare & Insurance",
    children: (
      <Form.Item name={["jobBenefits", "healthcare&Insurance"]}>
        <Checkbox.Group className="w-full grid xl:grid-cols-2 grid-cols-1 gap-2">
          <Checkbox value="Childcare and long-term care leave">
            Childcare and long-term care leave
          </Checkbox>
          <Checkbox value="Childcare support and daycare available">
            Childcare support and daycare available
          </Checkbox>
          <Checkbox value="Health insurance, available">
            Health insurance, available
          </Checkbox>
          <Checkbox value="Various medical low wages, yes">
            Various medical low wages, yes
          </Checkbox>
          <Checkbox value="Family health insurance">
            Family health insurance
          </Checkbox>
        </Checkbox.Group>
      </Form.Item>
    ),
  },
  {
    key: "8",
    label: "Pension Plan",
    children: (
      <Form.Item name={["jobBenefits", "pensionPlan"]}>
        <Checkbox.Group className="w-full grid xl:grid-cols-2 grid-cols-1 gap-2">
          <Checkbox value="Retirement allowance, available">
            Retirement allowance, available
          </Checkbox>
        </Checkbox.Group>
      </Form.Item>
    ),
  },
  {
    key: "9",
    label: "Financial Benefits",
    children: (
      <Form.Item name={["jobBenefits", "financialBenefits"]}>
        <Checkbox.Group className="w-full grid xl:grid-cols-2 grid-cols-1 gap-2">
          <Checkbox value="Commission"> Commission </Checkbox>
          <Checkbox value="Stock options available">
            Stock options available
          </Checkbox>
          <Checkbox value="Festival bonus"> Festival bonus </Checkbox>
          <Checkbox value="Performance bonus available">
            Performance bonus available
          </Checkbox>
          <Checkbox value="Project-specific incentives available">
            Project-specific incentives available
          </Checkbox>
          <Checkbox value="Annual salary review">Annual salary review</Checkbox>
          <Checkbox value="Overtime allowance available">
            Overtime allowance available
          </Checkbox>
          <Checkbox value="Cell phone allowance">Cell phone allowance</Checkbox>
          <Checkbox value="Tour allowance"> Tour allowance </Checkbox>
          <Checkbox value="With stock option"> With stock option </Checkbox>
        </Checkbox.Group>
      </Form.Item>
    ),
  },
  {
    key: "10",
    label: "Personal Financial Benefit",
    children: (
      <Form.Item name={["jobBenefits", "personalFinancialBenefit"]}>
        <Checkbox.Group className="w-full grid xl:grid-cols-2 grid-cols-1 gap-2">
          <Checkbox value="Loan"> Loan </Checkbox>
          <Checkbox value="There is a company house / rent subsidy system">
            There is a company house / rent subsidy system
          </Checkbox>
          <Checkbox value="Profit sharing"> Profit sharing </Checkbox>
          <Checkbox value="There is an incentive">
            There is an incentive
          </Checkbox>
          <Checkbox value="There is a commission">
            There is a commission
          </Checkbox>
        </Checkbox.Group>
      </Form.Item>
    ),
  },
  {
    key: "11",
    label: "Work-life Balance",
    children: (
      <Form.Item name={["jobBenefits", "workLifeBalance"]}>
        <Checkbox.Group className="w-full grid xl:grid-cols-2 grid-cols-1 gap-2">
          <Checkbox value="Paid vacation days"> Paid vacation days </Checkbox>
          <Checkbox value="Company trip at least once a year">
            Company trip at least once a year
          </Checkbox>
        </Checkbox.Group>
      </Form.Item>
    ),
  },
  {
    key: "12",
    label: "Mobility",
    children: (
      <Form.Item name={["jobBenefits", "mobility"]}>
        <Checkbox.Group className="w-full grid xl:grid-cols-2 grid-cols-1 gap-2">
          <Checkbox value="Full commuter transportation expenses payment">
            Full commuter transportation expenses payment
          </Checkbox>
          <Checkbox value="5 minutes walk from the station">
            5 minutes walk from the station
          </Checkbox>
          <Checkbox value="Company Bus Available">
            Company Bus Available
          </Checkbox>
          <Checkbox value="Car Parking available">
            Car Parking available
          </Checkbox>
        </Checkbox.Group>
      </Form.Item>
    ),
  },
];
