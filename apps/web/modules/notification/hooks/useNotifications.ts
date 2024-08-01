import { NotificationCategory, NotificationFragment } from "@imax/client";
import { useCallback, useEffect, useState } from "react";
import { executeApi } from "~/client/api";


export const useNotifications = ({ category, message, limit, page }: UseNotificationsProps = {}) => {
    
    const [notifications, setNotifications] = useState<NotificationFragment[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const data = await executeApi("notifications", {category, message, limit, page});
            setNotifications(data);
        }

        fetchNotifications();
    }, [category, limit, message, page]);

    return notifications;
}

type UseNotificationsProps = {
    category?: NotificationCategory;
    message?: string;
    limit?: number;
    page?: number;
}

