import gql from "graphql-tag";

// Query to get Total Department and Employee counts
export const DASHBOARD_TOTAL_COUNTS_QUERY = gql`
  query DashboardTotalCounts {
    departments {
      totalCount
    }
    employees {
      totalCount
    }
  }
`;

// Query to get upcoming events
export const DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY = gql`
  query DashboardCalendarUpcomingEvents(
    $filter: EventFilter!
    $sorting: [EventSort!]
    $paging: OffsetPaging!
  ) {
    events(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        title
        color
        startDate
        endDate
      }
    }
  }
`;

// Query to get potential employee offers chart
export const DASHBOARD_DEALS_CHART_QUERY = gql`
  query DashboardEmployeeOfferChart(
    $filter: DealStageFilter!
    $sorting: [DealStageSort!]
    $paging: OffsetPaging
  ) {
    dealStages(filter: $filter, sorting: $sorting, paging: $paging) {
      # Get all deal stages
      nodes {
        id
        title
        # Get the sum of all offers in this stage and group by closeDateMonth and closeDateYear
        dealsAggregate {
          groupBy {
            closeDateMonth
            closeDateYear
          }
          sum {
            value
          }
        }
      }
      # Get the total count of all deals in this stage
      totalCount
    }
  }
`;

// Query to get latest activities deals
export const DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY = gql`
  query DashboardLatestActivitiesDeals(
    $filter: DealFilter!
    $sorting: [DealSort!]
    $paging: OffsetPaging
  ) {
    deals(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        title
        stage {
          id
          title
        }
        department {
          id
          name
          avatarUrl
        }
        createdAt
      }
    }
  }
`;

// Query to get latest activities audits
export const DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY = gql`
  query DashboardLatestActivitiesAudits(
    $filter: AuditFilter!
    $sorting: [AuditSort!]
    $paging: OffsetPaging
  ) {
    audits(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        action
        targetEntity
        targetId
        changes {
          field
          from
          to
        }
        createdAt
        user {
          id
          name
          avatarUrl
        }
      }
    }
  }
`;

// Query to get companies list
export const DEPARTMENT_LIST_QUERY = gql`
  query DepartmentList(
    $filter: DepartmentFilter!
    $sorting: [DepartmentSort!]
    $paging: OffsetPaging!
  ) {
    department(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        name
        avatarUrl
        # Get the sum of all employees in this department
        employeeAggregate {
          sum {
            value
          }
        }
      }
    }
  }
`;

// Query to get users list
export const EMPLOYEE_SELECT_QUERY = gql`
  query EmployeeSelect(
    $filter: UserFilter!
    $sorting: [UserSort!]
    $paging: OffsetPaging!
  ) {
    # Get all employees
    employees(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount # Get the total count of employees
      # Get specific fields for each user
      nodes {
        id
        name
        avatarUrl
      }
    }
  }
`;

// Query to get contacts associated with a company
export const DEPARTMENT_CONTACTS_TABLE_QUERY = gql`
  query DepartmentContactsTable(
    $filter: ContactFilter!
    $sorting: [ContactSort!]
    $paging: OffsetPaging!
  ) {
    contacts(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        name
        avatarUrl
        jobTitle
        email
        phone
        status
      }
    }
  }
`;

// Query to get task stages list
export const TASK_STAGES_QUERY = gql`
  query TaskStages(
    $filter: TaskStageFilter!
    $sorting: [TaskStageSort!]
    $paging: OffsetPaging!
  ) {
    taskStages(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount # Get the total count of task stages
      nodes {
        id
        title
      }
    }
  }
`;

// Query to get tasks list
export const TASKS_QUERY = gql`
  query Tasks(
    $filter: TaskFilter!
    $sorting: [TaskSort!]
    $paging: OffsetPaging!
  ) {
    tasks(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount # Get the total count of tasks
      nodes {
        id
        title
        description
        dueDate
        completed
        stageId
        # Get user details associated with this task
        users {
          id
          name
          avatarUrl
        }
        createdAt
        updatedAt
      }
    }
  }
`;

// Query to get task stages for select
export const TASK_STAGES_SELECT_QUERY = gql`
  query TaskStagesSelect(
    $filter: TaskStageFilter!
    $sorting: [TaskStageSort!]
    $paging: OffsetPaging!
  ) {
    taskStages(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        title
      }
    }
  }
`;
