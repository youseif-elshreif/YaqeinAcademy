"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import * as adminSvc from "@/utils/services/admin.service";

type GroupsContextType = {
  groups: any[];
  isLoading: boolean;
  error: string | null;
  lessonsRefreshKey: number;
  getGroups: (token: string) => Promise<any[]>;
  getGroupById: (token: string, groupId: string) => Promise<any>;
  createGroup: (token: string, groupData: any) => Promise<any>;
  updateGroup: (token: string, groupId: string, groupData: any) => Promise<any>;
  deleteGroup: (token: string, groupId: string) => Promise<any>;
  addGroupMember: (
    token: string,
    groupId: string,
    memberData: { memberId: string }
  ) => Promise<any>;
  removeGroupMember: (
    token: string,
    groupId: string,
    memberId: string
  ) => Promise<any>;
  addLessonToGroup: (
    token: string,
    groupId: string,
    data: { scheduledAt: string; subject: string; meetingLink: string }
  ) => Promise<any>;
  updateLesson: (
    token: string,
    lessonId: string,
    data: { scheduledAt: string; subject: string; meetingLink: string }
  ) => Promise<any>;
  deleteLesson: (token: string, lessonId: string) => Promise<any>;
  refreshGroups: (token: string) => Promise<void>;
  triggerLessonsRefresh: () => void;
};

const GroupsContext = createContext<GroupsContextType | undefined>(undefined);

export const useGroupsContext = () => {
  const context = useContext(GroupsContext);
  if (!context) {
    throw new Error("useGroupsContext must be used within GroupsProvider");
  }
  return context;
};

type GroupsProviderProps = {
  children: ReactNode;
};

export const GroupsProvider = ({ children }: GroupsProviderProps) => {
  const [groups, setGroups] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lessonsRefreshKey, setLessonsRefreshKey] = useState(0);

  const getGroups = useCallback(async (token: string): Promise<any[]> => {
    try {
      setIsLoading(true);
      setError(null);
      // Note: token parameter kept for compatibility but not used in current API
      void token;
      const data = await adminSvc.getGroups();
      console.log("Fetched groups:", data);
      setGroups(data);
      return data;
    } catch (error) {
      console.error("Error fetching groups:", error);
      setError("فشل في جلب بيانات المجموعات");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getGroupById = useCallback(async (token: string, groupId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await adminSvc.getGroupById(groupId);
      console.log("Fetched group by ID:", data);
      return data;
    } catch (error) {
      console.error("Error fetching group by ID:", error);
      setError("فشل في جلب بيانات المجموعة");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createGroup = useCallback(
    async (token: string, groupData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.createGroup(groupData);
        console.log("Created group:", data);
        // Refresh groups list
        await getGroups(token);
        return data;
      } catch (error) {
        console.error("Error creating group:", error);
        setError("فشل في إنشاء المجموعة");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getGroups]
  );

  const updateGroup = useCallback(
    async (token: string, groupId: string, groupData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.updateGroup(groupId, groupData);
        console.log("Updated group:", data);
        // Refresh groups list
        await getGroups(token);
        return data;
      } catch (error) {
        console.error("Error updating group:", error);
        setError("فشل في تحديث المجموعة");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getGroups]
  );

  const deleteGroup = useCallback(
    async (token: string, groupId: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.deleteGroup(groupId);
        console.log("Deleted group:", data);
        // Refresh groups list
        await getGroups(token);
        return data;
      } catch (error) {
        console.error("Error deleting group:", error);
        setError("فشل في حذف المجموعة");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getGroups]
  );

  const addGroupMember = useCallback(
    async (
      token: string,
      groupId: string,
      memberData: { memberId: string }
    ) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.addGroupMember(
          groupId,
          memberData.memberId
        );
        console.log("Added group member:", data);
        // Refresh groups list
        await getGroups(token);
        return data;
      } catch (error) {
        console.error("Error adding group member:", error);
        setError("فشل في إضافة عضو للمجموعة");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getGroups]
  );

  const removeGroupMember = useCallback(
    async (token: string, groupId: string, memberId: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.removeGroupMember(groupId, memberId);
        console.log("Removed group member:", data);
        // Refresh groups list
        await getGroups(token);
        return data;
      } catch (error) {
        console.error("Error removing group member:", error);
        setError("فشل في إزالة عضو من المجموعة");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getGroups]
  );

  const addLessonToGroup = useCallback(
    async (
      token: string,
      groupId: string,
      data: { scheduledAt: string; subject: string; meetingLink: string }
    ) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await adminSvc.addLessonToGroup(groupId, data);
        console.log("Added lesson to group:", result);
        setLessonsRefreshKey((prev) => prev + 1);
        return result;
      } catch (error) {
        console.error("Error adding lesson to group:", error);
        setError("فشل في إضافة درس للمجموعة");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateLesson = useCallback(
    async (
      token: string,
      lessonId: string,
      data: { scheduledAt: string; subject: string; meetingLink: string }
    ) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await adminSvc.updateLesson(lessonId, data);
        console.log("Updated lesson:", result);
        setLessonsRefreshKey((prev) => prev + 1);
        return result;
      } catch (error) {
        console.error("Error updating lesson:", error);
        setError("فشل في تحديث الدرس");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deleteLesson = useCallback(async (token: string, lessonId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await adminSvc.deleteLesson(lessonId);
      console.log("Deleted lesson:", result);
      setLessonsRefreshKey((prev) => prev + 1);
      return result;
    } catch (error) {
      console.error("Error deleting lesson:", error);
      setError("فشل في حذف الدرس");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshGroups = useCallback(
    async (token: string) => {
      await getGroups(token);
    },
    [getGroups]
  );

  const triggerLessonsRefresh = useCallback(() => {
    setLessonsRefreshKey((prev) => prev + 1);
  }, []);

  const contextValue: GroupsContextType = {
    groups,
    isLoading,
    error,
    lessonsRefreshKey,
    getGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup,
    addGroupMember,
    removeGroupMember,
    addLessonToGroup,
    updateLesson,
    deleteLesson,
    refreshGroups,
    triggerLessonsRefresh,
  };

  return (
    <GroupsContext.Provider value={contextValue}>
      {children}
    </GroupsContext.Provider>
  );
};
