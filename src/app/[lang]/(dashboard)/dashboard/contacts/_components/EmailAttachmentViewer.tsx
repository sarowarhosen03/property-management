import Image from "next/image";
import React from "react";

interface EmailAttachmentViewerProps {
  attachments: string[];
}

const EmailAttachmentViewer: React.FC<EmailAttachmentViewerProps> = ({
  attachments,
}) => {
  const renderAttachment = (url: string) => {
    const fileType = url.split(".").pop()?.toLowerCase();

    if (
      fileType === "png" ||
      fileType === "jpg" ||
      fileType === "jpeg" ||
      fileType === "gif"
    ) {
      return (
        <Image
          src={url}
          alt="Attachment"
          className="attachment-image"
          width={300}
          height={300}
        />
      );
    } else {
      return (
        <a href={url} download>
          Download Attachment
        </a>
      );
    }
  };

  return (
    <div className="attachments-container">
      {attachments.length > 0 ? (
        attachments.map((url, index) => (
          <div key={index} className="attachment-item">
            {renderAttachment(url)}
          </div>
        ))
      ) : (
        <p>No attachments available</p>
      )}
    </div>
  );
};

export default EmailAttachmentViewer;
