import "./_announcement-bar.scss";

export default function AnnouncementBar({ content, targetLink }) {
  return (
    <div className="rethink-announcement">
      <div className="rethink-announcement__wrapper">
        <p className="rethink-announcement__content">
          {targetLink ? <a href={targetLink}>{content}</a> : { content }}
        </p>
      </div>
    </div>
  );
}
