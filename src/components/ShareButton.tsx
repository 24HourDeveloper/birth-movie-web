import "../App.css";

type ShareButtonType = {
  label: string;
  social: string;
  movieList: string[];
  handleClick: () => void;
}

export default function ShareButton({ label, handleClick, social, movieList }: ShareButtonType) {
  return (
    <button
      className="share-button"
      onClick={handleClick}
      data-sharer={social}
      data-title={`A few movies released the year I was born ${movieList}`}
      data-url="https://blissful-beaver-33cf0d.netlify.com/"
    >
      {label.toUpperCase()}
    </button>
  );
}