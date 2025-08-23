"use client";
// apis requests for admin context
import {
  useContext,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import api, { API_BASE_URL } from "@/utils/api";
import { AdminDashboardContextType, TeachersResponse } from "@/utils/types";
import { createLessonSchedule } from "@/utils/date";

const AdminDashboardContext = createContext<
  AdminDashboardContextType | undefined
>(undefined);

export const AdminDashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // Groups state
  const [groups, setGroups] = useState<any[]>([]);
  // Teachers state
  const [teachers, setTeachers] = useState<TeachersResponse | null>(null);
  // Students state
  const [students, setStudents] = useState<any[]>([]);
  // Courses state
  const [courses, setCourses] = useState<any[]>([]);
  // Stats state
  const [stats, setStats] = useState({
    totalTeachers: 0,
    totalStudents: 0,
    totalUsers: 0,
  });

  // create teatcher
  const createTeacher = useCallback(async (token: string, teacherData: any) => {
    try {
      if (typeof window === "undefined") {
        throw new Error("Not running in browser environment");
      }

      const response = await api.post(
        `${API_BASE_URL}/api/teacher`,
        teacherData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Created teacher:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating teacher:", error);
      throw error;
    }
  }, []);

  // get teachers
  const getTeachers = useCallback(async (token: string) => {
    try {
      if (typeof window === "undefined") {
        throw new Error("Not running in browser environment");
      }

      const response = await api.get(`${API_BASE_URL}/api/teacher`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched teachers:", response.data);
      setTeachers(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching teachers:", error);
      throw error;
    }
  }, []);

  // update member (replaces updateTeacher)
  const updateMember = useCallback(
    async (token: string, memberId: string, memberData: any) => {
      try {
        if (typeof window === "undefined") {
          throw new Error("Not running in browser environment");
        }

        const response = await api.put(
          `${API_BASE_URL}/api/admin/members/${memberId}`,
          memberData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Updated member:", response.data);

        // Refresh data after update
        await getTeachers(token);

        return response.data;
      } catch (error) {
        console.error("Error updating member:", error);
        throw error;
      }
    },
    [getTeachers]
  );

  // get students (for admin dashboard)
  const getStudents = useCallback(async (token: string) => {
    try {
      if (typeof window === "undefined") {
        throw new Error("Not running in browser environment");
      }

      const response = await api.get(`${API_BASE_URL}/api/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Get all users from the response
      const allUsers = response.data.data.users;

      // Filter students
      const studentsOnly = allUsers.filter(
        (user: any) => user.role === "student"
      );

      // Calculate stats
      const totalTeachers = allUsers.filter(
        (user: any) => user.role === "teacher"
      ).length;
      const totalStudents = studentsOnly.length;
      const totalUsers = allUsers.length;

      // Set students data
      setStudents(studentsOnly);

      // Set stats data
      setStats({
        totalTeachers,
        totalStudents,
        totalUsers,
      });

      console.log("Fetched students:", studentsOnly);
      console.log("Dashboard stats:", {
        totalTeachers,
        totalStudents,
        totalUsers,
      });

      return studentsOnly;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  }, []);

  // update teacher - specific API for teachers
  const updateTeacher = useCallback(
    async (token: string, teacherId: string, teacherData: any) => {
      try {
        if (typeof window === "undefined") {
          throw new Error("Not running in browser environment");
        }

        const response = await api.put(
          `${API_BASE_URL}/api/teacher/${teacherId}`,
          teacherData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Updated teacher:", response.data);

        // Refresh teachers data after update
        await getTeachers(token);

        return response.data;
      } catch (error) {
        console.error("Error updating teacher:", error);
        throw error;
      }
    },
    [getTeachers]
  );

  // update student - using existing member API
  const updateStudent = useCallback(
    async (token: string, studentId: string, studentData: any) => {
      try {
        if (typeof window === "undefined") {
          throw new Error("Not running in browser environment");
        }

        console.log("🔄 updateStudent called with:");
        console.log("- studentId:", studentId);
        console.log("- studentData:", studentData);
        console.log(
          "- API URL:",
          `${API_BASE_URL}/api/admin/members/${studentId}`
        );

        const response = await api.put(
          `${API_BASE_URL}/api/admin/members/${studentId}`,
          studentData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("✅ Student updated successfully:", response.data);

        // Refresh students data after update
        await getStudents(token);

        return response.data;
      } catch (error) {
        console.error("❌ Error updating student:", error);
        if (error.response) {
          console.error("📤 Response status:", error.response.status);
          console.error("📤 Response data:", error.response.data);
        }
        throw error;
      }
    },
    [getStudents]
  );

  // delete teacher
  const deleteTeacher = useCallback(
    async (token: string, teacherId: string) => {
      try {
        if (typeof window === "undefined") {
          throw new Error("Not running in browser environment");
        }

        const response = await api.delete(
          `${API_BASE_URL}/api/teacher/${teacherId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Deleted teacher:", response.data);

        // Refresh teachers data after deletion
        await getTeachers(token);

        return response.data;
      } catch (error) {
        console.error("Error deleting teacher:", error);
        throw error;
      }
    },
    [getTeachers]
  );

  //create students
  const createStudent = useCallback(async (studentData: any) => {
    try {
      if (typeof window === "undefined") {
        throw new Error("Not running in browser environment");
      }

      const response = await api.post(
        `${API_BASE_URL}/api/auth/register`,
        studentData
      );
      console.log("Created student:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating student:", error);
      throw error;
    }
  }, []);

  // create admin
  const createAdmin = useCallback(async (adminData: any) => {
    try {
      if (typeof window === "undefined") {
        throw new Error("Not running in browser environment");
      }

      const response = await api.post(`${API_BASE_URL}/api/admin`, adminData);
      console.log("Created admin:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating admin:", error);
      throw error;
    }
  }, []);

  // add credits to student
  const addCreditsToStudent = useCallback(
    async (
      token: string,
      studentId: string,
      privateAmount: number,
      publicAmount: number = 0
    ) => {
      try {
        if (typeof window === "undefined") {
          throw new Error("Not running in browser environment");
        }

        const creditsData = {
          userId: studentId,
          privateAmount,
          publicAmount,
        };

        console.log("Adding credits:", creditsData);
        const response = await api.patch(
          `${API_BASE_URL}/api/admin/credits`,
          creditsData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Added credits:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error adding credits:", error);
        throw error;
      }
    },
    []
  );

  // create group
  const createGroup = useCallback(async (token: string, groupData: any) => {
    try {
      if (typeof window === "undefined") {
        throw new Error("Not running in browser environment");
      }

      console.log("groupData:", groupData);
      const response = await api.post(`${API_BASE_URL}/api/group`, groupData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Created group:", response.data);

      // Extract group information from response
      const createdGroup = response.data;
      console.log("Created group data:", createdGroup);
      const groupId = createdGroup.id || createdGroup._id;
      const meetingLink = createdGroup.meetingLink;

      // Check if we have lesson scheduling data
      if (
        groupData.weekdays &&
        groupData.times &&
        Array.isArray(groupData.weekdays) &&
        Array.isArray(groupData.times)
      ) {
        console.log("Creating lesson schedule for group:", groupId);
        console.log("Weekdays:", groupData.weekdays);
        console.log("Times:", groupData.times);

        try {
          // Create lessons using the helper function
          const lessonSchedules = createLessonSchedule(
            groupData.weekdays,
            groupData.times,
            meetingLink
          );
          console.log("Lesson schedules to create:", lessonSchedules);
          // Send POST request for each lesson schedule
          const lessonPromises = lessonSchedules.map((lessonSchedule) =>
            api.post(
              `${API_BASE_URL}/api/lesson/group/${groupId}`,
              lessonSchedule,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          );

          // Wait for all lessons to be created
          const lessonResponses = await Promise.all(lessonPromises);
          console.log(
            "Created lessons:",
            lessonResponses.map((r) => r.data)
          );
        } catch (lessonError) {
          console.error("Error creating lessons for group:", lessonError);
          // Don't throw here - group was created successfully, just log the lesson creation error
        }
      }

      return response.data;
    } catch (error) {
      console.error("Error creating group:", error);
      throw error;
    }
  }, []);

  // add member to group
  const addGroupMember = useCallback(
    async (
      token: string,
      groupId: string,
      memberData: { memberId: string }
    ) => {
      try {
        if (typeof window === "undefined") {
          throw new Error("Not running in browser environment");
        }

        console.log("Adding member to group:", { groupId, memberData });
        const response = await api.post(
          `${API_BASE_URL}/api/group/${groupId}/members`,
          memberData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Added member to group:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error adding member to group:", error);
        throw error;
      }
    },
    []
  );

  // get groups
  const getGroups = useCallback(async (token: string) => {
    try {
      if (typeof window === "undefined") {
        throw new Error("Not running in browser environment");
      }

      const response = await api.get(`${API_BASE_URL}/api/group`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched groups:", response.data);

      // ✅ حفظ البيانات في الـ state لتحديث الجدول تلقائياً
      setGroups(response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching groups:", error);
      throw error;
    }
  }, []);

  // delete group
  const deleteGroup = useCallback(async (token: string, groupId: string) => {
    try {
      if (typeof window === "undefined") {
        throw new Error("Not running in browser environment");
      }

      const response = await api.delete(
        `${API_BASE_URL}/api/group/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Deleted group:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting group:", error);
      throw error;
    }
  }, []);

  // update group
  const updateGroup = useCallback(
    async (token: string, groupId: string, groupData: any) => {
      try {
        if (typeof window === "undefined") {
          throw new Error("Not running in browser environment");
        }

        console.log("Updating group with data:", groupData);
        const response = await api.put(
          `${API_BASE_URL}/api/group/${groupId}`,
          groupData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Updated group:", response.data);

        // Extract group information from response
        const updatedGroup = response.data;
        console.log("Updated group data:", updatedGroup);
        const returnGroupId = updatedGroup.id || updatedGroup._id;
        const meetingLink = updatedGroup.meetingLink;

        // Create lesson schedule if weekdays and times are provided
        if (
          groupData.weekdays &&
          groupData.times &&
          Array.isArray(groupData.weekdays) &&
          Array.isArray(groupData.times)
        ) {
          console.log(
            "Creating lesson schedule for updated group:",
            returnGroupId
          );

          try {
            // Create lessons using the helper function
            const lessonSchedules = createLessonSchedule(
              groupData.weekdays,
              groupData.times,
              meetingLink
            );
            console.log("Lesson schedules to create:", lessonSchedules);

            // Send POST request for each lesson schedule
            const lessonPromises = lessonSchedules.map((lessonSchedule) =>
              api.post(
                `${API_BASE_URL}/api/lesson/group/${returnGroupId}`,
                lessonSchedule,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              )
            );

            const lessonResponses = await Promise.all(lessonPromises);
            console.log("Created lessons:", lessonResponses);
          } catch (lessonError) {
            console.error(
              "Error creating lessons for updated group:",
              lessonError
            );
            // Don't throw here to avoid breaking group update
          }
        }

        return {
          ...updatedGroup,
          _id: returnGroupId,
          name: updatedGroup.name || groupData.name,
          type: updatedGroup.type || groupData.type,
        };
      } catch (error) {
        console.error("Error updating group:", error);
        throw error;
      }
    },
    []
  );

  // remove group member
  const removeGroupMember = useCallback(
    async (groupId: string, memberId: string, token: string) => {
      try {
        if (typeof window === "undefined") {
          throw new Error("Not running in browser environment");
        }

        console.log("memberId:", memberId);
        console.log("groupId:", groupId);

        const response = await api.delete(
          `${API_BASE_URL}/api/group/${groupId}/members`,
          {
            data: {
              memberId: memberId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Removed group member:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error removing group member:", error);
        throw error;
      }
    },
    []
  );

  // Course Functions
  // Get all courses
  const getCourses = useCallback(async (token: string) => {
    try {
      if (typeof window === "undefined") {
        throw new Error("Not running in browser environment");
      }

      const response = await api.get(`${API_BASE_URL}/api/course`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched courses:", response.data);

      // Save data in state to update UI automatically
      setCourses(response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  }, []);

  // Get course by ID
  const getCourseByIdAPI = useCallback(
    async (token: string, courseId: string) => {
      try {
        if (typeof window === "undefined") {
          throw new Error("Not running in browser environment");
        }

        const response = await api.get(
          `${API_BASE_URL}/api/course/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched course:", response.data);

        return response.data;
      } catch (error) {
        console.error("Error fetching course:", error);
        throw error;
      }
    },
    []
  );

  // Create course
  const createCourse = useCallback(
    async (token: string, courseData: any) => {
      try {
        if (typeof window === "undefined") {
          throw new Error("Not running in browser environment");
        }

        const response = await api.post(
          `${API_BASE_URL}/api/course`,
          courseData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Created course:", response.data);

        // Update courses list
        const updatedCourses = await getCourses(token);
        setCourses(updatedCourses);

        return response.data;
      } catch (error) {
        console.error("Error creating course:", error);
        throw error;
      }
    },
    [getCourses]
  );

  // Update course
  const updateCourse = useCallback(
    async (token: string, courseId: string, courseData: any) => {
      try {
        if (typeof window === "undefined") {
          throw new Error("Not running in browser environment");
        }

        const response = await api.put(
          `${API_BASE_URL}/api/course/${courseId}`,
          courseData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Updated course:", response.data);

        // Update courses list
        const updatedCourses = await getCourses(token);
        setCourses(updatedCourses);

        return response.data;
      } catch (error) {
        console.error("Error updating course:", error);
        throw error;
      }
    },
    [getCourses]
  );

  // Delete course
  const deleteCourse = useCallback(
    async (token: string, courseId: string) => {
      try {
        if (typeof window === "undefined") {
          throw new Error("Not running in browser environment");
        }

        const response = await api.delete(
          `${API_BASE_URL}/api/course/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Deleted course:", response.data);

        // Update courses list
        const updatedCourses = await getCourses(token);
        setCourses(updatedCourses);

        return response.data;
      } catch (error) {
        console.error("Error deleting course:", error);
        throw error;
      }
    },
    [getCourses]
  );

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      groups, // ✅ البيانات متاحة للجميع
      teachers, // ✅ بيانات المعلمين
      students, // ✅ بيانات الطلاب
      courses, // ✅ بيانات الكورسات
      stats, // ✅ الإحصائيات
      getTeachers,
      createTeacher,
      updateMember,
      updateTeacher,
      updateStudent,
      deleteTeacher,
      createStudent,
      createAdmin,
      addCreditsToStudent,
      createGroup,
      updateGroup,
      deleteGroup,
      addGroupMember,
      removeGroupMember,
      getStudents,
      getGroups,
      // Course functions
      getCourses,
      getCourseByIdAPI,
      createCourse,
      updateCourse,
      deleteCourse,
    }),
    [
      groups, // ✅ التحديث عند تغيير البيانات
      teachers, // ✅ التحديث عند تغيير بيانات المعلمين
      students, // ✅ التحديث عند تغيير بيانات الطلاب
      courses, // ✅ التحديث عند تغيير بيانات الكورسات
      stats, // ✅ التحديث عند تغيير الإحصائيات
      getTeachers,
      createTeacher,
      updateMember,
      updateTeacher,
      updateStudent,
      deleteTeacher,
      createStudent,
      createAdmin,
      addCreditsToStudent,
      createGroup,
      updateGroup,
      deleteGroup,
      addGroupMember,
      removeGroupMember,
      getStudents,
      getGroups,
      // Course functions
      getCourses,
      getCourseByIdAPI,
      createCourse,
      updateCourse,
      deleteCourse,
    ]
  );

  return (
    <AdminDashboardContext.Provider value={contextValue}>
      {children}
    </AdminDashboardContext.Provider>
  );
};

export const useAdminDashboardContext = () => {
  const context = useContext(AdminDashboardContext);
  if (!context) {
    throw new Error(
      "useAdminDashboardContext must be used within an AdminDashboardProvider"
    );
  }
  return context;
};
