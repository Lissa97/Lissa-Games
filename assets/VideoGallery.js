  
 class VideoElement
 {
    constructor(id, title)
    {
        this.id = id;
        this.title = title;
    }
 }
 
 function LaodVideoGallery(section, elements)
  {
    function CreateVidoElement(element)
    {
        var newElement = document.createElement("a");
        newElement.className = "video-card";
        newElement.dataset.videoId = element.id;
        newElement.href = `https://www.youtube.com/watch?v=${element.id}`;

        var preview = document.createElement("img");
        preview.className = "video-thumb";
        preview.alt = "Video Thumbnail";

        var title = document.createElement("div");
        title.className = "video-title";
        title.innerText = element.title;

        var play = document.createElement("a");
        play.className = "play-button";
        play.innerText = "▶";

        newElement.appendChild(preview);
        newElement.appendChild(title);
        newElement.appendChild(play);

        return newElement;
    }
 

  var gallery = document.createElement("div");
  gallery.className = "video-grid";
  section.appendChild(gallery);

  elements.forEach(element => {

    var card = CreateVidoElement(element);

    gallery.appendChild(card);

    const id = card.dataset.videoId;
    const thumbnail = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    const fallback = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

    const img = card.querySelector('.video-thumb');
    const link = card.querySelector('.play-button');

    // Try maxres first
    img.src = thumbnail;

    // If it fails, fall back to hq
    img.onerror = () => {
      img.src = fallback;
    };

    link.href = `https://www.youtube.com/watch?v=${id}`; 
  });
}