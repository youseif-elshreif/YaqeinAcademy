"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import * as adminSvc from "@/src/utils/services/admin.service";

type GroupsContextType = {
  groups: any[];
  isLoading: boolean;
  error: string | null;
  lessonsRefreshKey: number;
  getGroups: () => Promise<any[]>;
  getGroupById: (groupId: string) => Promise<any>;
  createGroup: (groupData: any) => Promise<any>;
  updateGroup: (groupId: string, groupData: any) => Promise<any>;
  deleteGroup: (groupId: string) => Promise<any>;
  addGroupMember: (
    groupId: string,
    memberData: { memberId: string }
  ) => Promise<any>;
  removeGroupMember: (groupId: string, memberId: string) => Promise<any>;
  addLessonToGroup: (
    groupId: string,
    data: { scheduledAt: string; subject: string; meetingLink: string }
  ) => Promise<any>;
  updateLesson: (
    lessonId: string,
    data: { scheduledAt: string; subject: string; meetingLink: string }
  ) => Promise<any>;
  deleteLesson: (lessonId: string) => Promise<any>;
  refreshGroups: () => Promise<void>;
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

  const getGroups = useCallback(async (): Promise<any[]> => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await adminSvc.getGroups();
      setGroups(data);
      return data;
    } catch (error) {
      setError("خطأ في جلب قائمة الحلقات");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getGroupById = useCallback(async (groupId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await adminSvc.getGroupById(groupId);
      return data;
    } catch (error) {
      setError("خطأ في جلب قائمة الحلقات");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createGroup = useCallback(
    async (groupData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.createGroup(groupData); // Refresh groups list
        await getGroups();
        return data;
      } catch (error) {
        setError("خطأ في إنشاء الحلقة");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getGroups]
  );

  const updateGroup = useCallback(
    async (groupId: string, groupData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.updateGroup(groupId, groupData); // Refresh groups list
        await getGroups();
        return data;
      } catch (error) {
        setError("خطأ في تحديث الحلقة");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getGroups]
  );

  const deleteGroup = useCallback(
    async (groupId: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.deleteGroup(groupId); // Refresh groups list
        await getGroups();
        return data;
      } catch (error) {
        setError("خطأ في حذف الحلقة");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getGroups]
  );

  const addGroupMember = useCallback(
    async (groupId: string, memberData: { memberId: string }) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.addGroupMember(
          groupId,
          memberData.memberId
        ); // Refresh groups list
        await getGroups();
        return data;
      } catch (error) {
        setError("خطأ في جلب بيانات الحلقات");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getGroups]
  );

  const removeGroupMember = useCallback(
    async (groupId: string, memberId: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminSvc.removeGroupMember(groupId, memberId); // Refresh groups list
        await getGroups();
        return data;
      } catch (error) {
        setError("خطأ في تحديث بيانات الحلقة");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [getGroups]
  );

  const addLessonToGroup = useCallback(
    async (
      groupId: string,
      data: { scheduledAt: string; subject: string; meetingLink: string }
    ) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await adminSvc.addLessonToGroup(groupId, data);
        setLessonsRefreshKey((prev) => prev + 1);
        return result;
      } catch (error) {
        setError("خطأ في إضافة الحلقة للحلقة");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateLesson = useCallback(
    async (
      lessonId: string,
      data: { scheduledAt: string; subject: string; meetingLink: string }
    ) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await adminSvc.updateLesson(lessonId, data);
        setLessonsRefreshKey((prev) => prev + 1);
        return result;
      } catch (error) {
        setError("خطأ في تحديث الحلقة");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deleteLesson = useCallback(async (lessonId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await adminSvc.deleteLesson(lessonId);
      setLessonsRefreshKey((prev) => prev + 1);
      return result;
    } catch (error) {
      setError("خطأ في حذف الحلقة");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshGroups = useCallback(async () => {
    await getGroups();
  }, [getGroups]);

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
