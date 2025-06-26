
  function renderPackages(packageList) {
    const grid = document.getElementById("packageGrid");
    packageList.forEach(pkg => {
      const card = document.createElement("div");
      card.className = "package-card";

      // Icon
      const img = document.createElement("img");
      img.src = pkg.ico;
      img.alt = pkg.packageName + " Preview";
      card.appendChild(img);

      // Title
      const title = document.createElement("h3");
      title.textContent = "➧ " + pkg.packageName;
      card.appendChild(title);

      // Description
      const desc = document.createElement("p");
      desc.textContent = pkg.description;
      card.appendChild(desc);

      // Tags
      if (pkg.tags && pkg.tags.length > 0) {
        const tagContainer = document.createElement("div");
        tagContainer.className = "tags";
        pkg.tags.forEach(tag => {
          const span = document.createElement("span");
          span.textContent = tag;
          tagContainer.appendChild(span);
        });
        card.appendChild(tagContainer);
      }

      // Refs / Links
      if (pkg.refs && pkg.refs.length > 0) {
        const links = document.createElement("div");
        links.className = "package-links";
        pkg.refs.forEach(link => {
          const a = document.createElement("a");
          a.href = link.href;
          a.target = "_blank";
          a.textContent = link.refName;
          links.appendChild(a);
        });
        card.appendChild(links);
      }

      grid.appendChild(card);
    });
  }