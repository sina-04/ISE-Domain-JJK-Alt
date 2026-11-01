import type { ReactNode } from 'react';
import groups from '@/lib/data/math-foundations.json';
import { formatNumber, type Course } from '@/lib/catalog';
import type { Locale } from '@/lib/domain-config';

export function MathematicsTree({
  courses,
  locale,
  renderCourse,
}: {
  courses: Course[];
  locale: Locale;
  renderCourse: (course: Course) => ReactNode;
}) {
  const visibleCourses = new Map(courses.map((course) => [course.id, course]));
  return (
    <div className="mathematics-tree">
      <h3 className="mathematics-tree-root">
        {locale === 'fa'
          ? 'مبانی ریاضی و تحلیلی'
          : 'Mathematical and Analytical Foundations'}
      </h3>
      <ol className="mathematics-tree-branches">
        {groups.map((group, index) => {
          const members = group.courseIds.flatMap((id) => {
            const course = visibleCourses.get(id);
            return course ? [course] : [];
          });
          return (
            members.length > 0 && (
              <li className="mathematics-tree-branch" key={group.id}>
                <h4>
                  <span>{formatNumber(index + 1, locale)}.</span>{' '}
                  {group.name[locale]}
                </h4>
                <ul>
                  {members.map((course) => (
                    <li key={course.id}>{renderCourse(course)}</li>
                  ))}
                </ul>
              </li>
            )
          );
        })}
      </ol>
    </div>
  );
}
