import { proxy } from "valtio";

export const blogCreationStore = proxy<{
  title: string;
  description: string;
  query: string;
  category: { id: number; displayName: string };
  imageUrl: string;
  thumbImageUrl: string;
  searchBar: boolean;
  setDescription: (description: string) => void;
  setTitle: (title: string) => void;
  setImage: (imageUrl: string) => void;
  setCategory: (val: { id: number; displayName: string }) => void;
  setThumbImageUrl: (thumbImageUrl: string) => void;
  setQuery: (query: string) => void;
  setSearchBar: (q: boolean) => void;

  clearStore: () => void;
}>({
  title: "",
  description: "",
  category: { id: 0, displayName: "" },
  imageUrl: "",
  thumbImageUrl: "",
  query: "",
  searchBar: false,
  setTitle(title) {
    this.title = title;
  },
  setDescription(description) {
    this.description = description;
  },
  setQuery(query) {
    this.query = query;
  },
  setImage(imageUrl) {
    this.imageUrl = imageUrl;
  },
  setCategory(val) {
    this.category = val;
  },
  setThumbImageUrl(val) {
    this.thumbImageUrl = val;
  },
  setSearchBar(val) {
    this.searchBar = val;
  },
  clearStore() {
    this.title = "";
    this.description = "";
    this.category = { id: 0, displayName: "" };
    this.imageUrl = "";
  },
});
