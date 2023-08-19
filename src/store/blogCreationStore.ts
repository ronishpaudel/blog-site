import { proxy } from "valtio";

export const blogCreationStore = proxy<{
  title: string;
  description: string;
  category: { id: number; displayName: string };
  imageUrl: string;
  thumbImageUrl: string;
  setDescription: (description: string) => void;
  setTitle: (title: string) => void;
  setImage: (imageUrl: string) => void;
  setCategory: (val: { id: number; displayName: string }) => void;
  setThumbImageUrl: (thumbImageUrl: string) => void;
  clearStore: () => void;
}>({
  title: "",
  description: "",
  category: { id: 0, displayName: "" },
  imageUrl: "",
  thumbImageUrl: "",
  setTitle(title) {
    this.title = title;
  },
  setDescription(description) {
    this.description = description;
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
  clearStore() {
    this.title = "";
    this.description = "";
    this.category = { id: 0, displayName: "" };
    this.imageUrl = "";
  },
});
