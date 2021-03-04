import React, { FunctionComponent } from "react";
import classnames from "classnames";

import { createPortal } from "react-dom";

type NotificationMessageProps = {
  notifications: { id: number; title?: string; message?: string; status?: boolean; }[];
  mountingElement: Element;
  onClose: any;
};

const NotificationMessage: FunctionComponent<NotificationMessageProps> = ({
  notifications,
  mountingElement,
}) => {
  return createPortal(
    <div className="notification-container top-right">
      {notifications.map(({ id, title, message, status }) => (
        <div key={id} className={classnames("notify-styleee", `notify__${status}`) }>
          <strong> {title}</strong>
          {message}
        </div>
      ))}
    </div>,
    mountingElement
  );
};

export default NotificationMessage;
