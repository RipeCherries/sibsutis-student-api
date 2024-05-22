export interface Schedule {
  ID: string;
  DATE_BEGIN: string;
  WEEK_DAY: string;
  WEEK: string;
  COURSE: string;
  GROUP: string;
  TEACHER: string | null;
  CLASSROOM: string;
  TYPE_LESSON: string;
  DISCIPLINE: string;
  SUBGROUP: string | null;
  PROJECT_SCHEDULE: string;
}
