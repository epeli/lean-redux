import React from "react";
import {connectLean} from "../src/lean";
import u from "updeep";

import RandomGif from "./RandomGif";

const RandomGifWithTag = connectLean({
    mapState(state) {
        return {tag: state.tag};
    },
})(RandomGif);

var RandomGifList = ({gifs, handleTagChange, newTag, addGif, scope}) => (
    <div>
        <input onChange={handleTagChange} value={newTag} />
        <button onClick={addGif} disabled={!newTag}>add</button>
        {Object.keys(gifs).sort().map(id => (
            <RandomGifWithTag key={id} scope={[scope, "gifs", id]} />
        ))}
    </div>
);
RandomGifList = connectLean({
    getInitialState() {
        return {
            nextId: 1,
            newTag: "ghost",
            gifs: {},
        };
    },

    handleTagChange(e) {
        e.preventDefault();
        this.setState({newTag: e.target.value});
    },

    addGif(e) {
        e.preventDefault();

        console.log("setting from new tag", this.state);
        this.setState(u({
            newTag: "",
            nextId: i => i + 1,
            gifs: {
                [this.state.nextId]: {
                    id:  this.state.nextId,
                    tag: this.state.newTag,
                },
            },
        }));
    },
})(RandomGifList);


export default RandomGifList;
