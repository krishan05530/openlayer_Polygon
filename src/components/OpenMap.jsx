


import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Draw from "ol/interaction/Draw";
import Modify from "ol/interaction/Modify";
import Select from "ol/interaction/Select";
import { Fill, Stroke, Style } from "ol/style";
import "ol/ol.css";

function OpenMap({ formData }) {
    const navigate = useNavigate();
    const { name, phoneNo } = formData;
    const mapDivRef = useRef(null);
    const [map, setMap] = useState(null);
    const [vectorSource] = useState(new VectorSource());
    const [activeInteraction, setActiveInteraction] = useState(null);
    const [clickedButton, setClickedButton] = useState(null); // Track active button

    useEffect(() => {
        if (!mapDivRef.current) return;

        const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: new Style({
                stroke: new Stroke({ color: "blue", width: 2 }),
                fill: new Fill({ color: "rgba(0, 0, 255, 0.1)" }),
            }),
        });

        const olMap = new Map({
            target: mapDivRef.current,
            layers: [new TileLayer({ source: new OSM() }), vectorLayer],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 2,
            }),
        });

        setMap(olMap);

        return () => olMap.setTarget(null);
    }, [vectorSource]);

    /** Remove existing interaction before adding a new one */
    const clearInteractions = () => {
        if (map && activeInteraction) {
            map.removeInteraction(activeInteraction);
            setActiveInteraction(null);
         
            
        }
    };

    /** Handle button clicks & persist active state */
    const handleClick = (callback, buttonName) => {
        setClickedButton(buttonName); // Set active button
        clearInteractions();

        callback(); // imlement the  the next function , draw or edit or delete
    };

    // Draw polygon
    const addDrawInteraction = () => {
        if (!map) return;

        const draw = new Draw({ source: vectorSource, type: "Polygon" });
        draw.on("drawend", (event) => {
            const feature = event.feature;
            feature.setId(`polygon-${Date.now()}`);
        });

        map.addInteraction(draw);
        setActiveInteraction(draw);

      
    };

    // Modify polygon
    const addModifyInteraction = () => {
        if (!map) return;

        const modify = new Modify({ source: vectorSource });
        map.addInteraction(modify);
        setActiveInteraction(modify);


    };

    // Delete selected polygon
    const deleteSelectedPolygon = () => {
        if (!map) return;

        const select = new Select();
        map.addInteraction(select);
        setActiveInteraction(select);

        select.on("select", (event) => {
            event.selected.forEach((feature) => {
                const featureId = feature.getId() || `polygon-${Date.now()}`;
                feature.setId(featureId);
                const featureToDelete = vectorSource.getFeatureById(featureId);
                if (featureToDelete) vectorSource.removeFeature(featureToDelete);
            });


// if there is no polygon left then remove the interaction and set the active interaction to null,
  // now when we click on  the delete button the selected polygon will get delted but interaction wil still remain with map so we  can delete more polygons
  // when we switch to differnt button then onclick of that button will remove previous interaction and then add the new interaction
            if (vectorSource.getFeatures().length === 0) {
                setClickedButton(null);
                map.removeInteraction(select);
                setActiveInteraction(null);
            }
        });

    };

    return (
        <div>
            <div className="flex flex-col items-center mt-3 mb-7">
                <p className="text-3xl font-bold">Name: {name || "No Name Provided"}</p>
                <button onClick={() => navigate("/")}>Go Back to Home Page</button>
            </div>

            <div className="flex justify-center gap-5 mb-[10px]">
                <button
                    className={`border p-2 rounded transition ${
                        clickedButton === "draw" ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => handleClick(addDrawInteraction, "draw")}
                >
                    Draw Polygon
                </button>

                <button
                    className={`border p-2 rounded transition ${
                        clickedButton === "edit" ? "bg-green-500 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => handleClick(addModifyInteraction, "edit")}
                >
                    Edit Polygon
                </button>

                <button
                    className={`border p-2 rounded transition ${
                        clickedButton === "delete" ? "bg-red-500 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => handleClick(deleteSelectedPolygon, "delete")}
                >
                    Delete Polygon
                </button>
            </div>

            <div ref={mapDivRef} style={{ width: "100%", height: "1000px" }} />
        </div>
    );
}

export default OpenMap;
