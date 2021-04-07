window.RenderMap = class RenderMap {
    constructor(el, center, zoom = 13) {
        this.markers = [];
        this.osmURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        this.osmAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        this.el = el;
        this.center = center;
        this.zoom = zoom;
        this.map = L.map(this.el, {
            center: this.center,
            zoom: this.zoom
        });

        this.map.addLayer(L.tileLayer(this.osmURL, {
            maxZoom: 20,
            attribution: this.osmAttr
        }));
    }

    setMarkers(params) {
        var icons = [
            {
                key: "shop",
                value: {
                    iconUrl: `${base_url}/images/marker/shop.png`,
                    iconSize: [40, 40], // size of the icon
                    // iconAnchor: [35, 94], // point of the icon which will correspond to marker's location
                    // shadowAnchor: [4, 62],  // the same for the shadow
                    popupAnchor: [0, 0]
                }
            },
        ]

        params.forEach(element => {
            var icon = icons.find(x => x.key == element.icon);

            if (icon) {
                if (element.iconSize) icon.value.iconSize = element.iconSize;
                var marker = L.marker(element.coordinate, { icon: L.icon(icon.value) }).addTo(this.map);

                if (element.popup) {
                    marker.bindPopup(element.popup);
                }

                if (element.onClick) {
                    marker.on('click', function (e) {
                        element.onClick(e)
                    });
                }

                this.markers.push(marker);
            }
        });
    }

    on(name, callback) {
        this.map.addEventListener(name, callback);
    }

    removeAllMarkers() {
        this.markers.forEach((val) => {
            this.map.removeLayer(val);
        });
    }
}