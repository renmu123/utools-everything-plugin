<script setup lang="ts">
import { ref } from "vue";
import { RecycleScroller } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

window.utools.onPluginEnter(({ code, type, payload }) => {
  window.utools.setSubInput((data) => {
    text.value = data.text;
    search(true);
  }, "本地搜索");

  console.log("onPluginEnter", code, type, payload);
  if (payload === "ss" || payload === "搜索") {
    text.value = "1";
    search(true);
  } else {
    window.utools.setSubInputValue(payload);
    text.value = payload;
    search(true);
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      // search(true);
      openFile(files.value[selectedIndex.value]);
    }
    if (e.key === "Escape") {
      window.utools.setSubInputValue("");
      window.utools.subInputFocus();
    }
    console.log(e);
    if (e.key === "ArrowDown") {
      console.log(scroller.value);

      if (selectedIndex.value < files.value.length - 1) {
        selectedIndex.value += 1;
      }
      const el = document.querySelector(
        `.file[data-index="${selectedIndex.value}"]`
      );

      // @ts-ignore
      el.scrollIntoView(false);
    }
    if (e.key === "ArrowUp") {
      if (selectedIndex.value > 0) {
        selectedIndex.value -= 1;
      }
      const el = document.querySelector(
        `.file[data-index="${selectedIndex.value}"]`
      );

      // @ts-ignore
      el.scrollIntoView(false);
    }
  });
});

const getVersion = async () => {
  const version = await window.everything.version();
  console.log("version", version);
};

const files = ref<
  {
    type: "dir" | "file";
    path: string;
    lastModified: string;
    size?: number;
  }[]
>([]);
const total = ref(0);
const text = ref("");
const selectedIndex = ref(0);
const scroller = ref(null);

const getList = async (
  text: string,
  options: {
    offset?: number;
  } = {}
) => {
  window.everything.limit(40);
  window.everything.offset(options.offset || 0);
  window.everything.addSearchText(text);

  const data = await window.everything.run();
  // files.value = data;
  return data;
};

const search = async (init: boolean = false, offset: number = 0) => {
  const data = await getList(text.value, {
    offset,
  });
  if (init) {
    files.value = data;
    total.value = 0;
    selectedIndex.value = 0;
  } else {
    files.value = files.value.concat(data);
  }

  total.value = await window.everything.getTotal();
  console.log("total", total.value);
};

getVersion();

const openFile = (file: {
  type: "dir" | "file";
  path: string;
  lastModified: string;
  size?: number;
}) => {
  // window.utools.hideMainWindow();
  // window.utools.outPlugin();
  if (file.type === "dir") {
    window.utools.shellOpenPath(file.path);
    return;
  } else if (file.type === "file") {
    console.log(file.path);
    window.utools.shellOpenPath(file.path);
    return;
  }
};

const scrollEnd = () => {
  console.log("scrollEnd");
  search(false, files.value.length);
};
</script>

<template>
  <div class="container">
    <div class="content">
      <RecycleScroller
        class="scroller"
        :items="files"
        :item-size="40"
        key-field="path"
        v-slot="{ item, index }"
        @scroll-end="scrollEnd"
        ref="scroller"
      >
        <div
          class="file"
          @dblclick="openFile(item)"
          @click="selectedIndex = index"
          :data-index="index"
          :class="{
            selected: index === selectedIndex,
          }"
        >
          {{ item.path }}
        </div>
      </RecycleScroller>
      <div class="footer">
        <div class="info">
          dassssssssss
          <span>共 {{ total }} 条</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
<style scoped lang="scss">
.scroller {
  height: calc(100vh - 70px);
}
.file {
  padding: 10px;
  border-bottom: 1px solid #eee;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.file:hover {
  background: #eee;
  cursor: pointer;
}
.file.selected {
  background: #eee;
}

.footer {
  position: fixed;
  bottom: 15px;
  padding: 15px 0px 0px 0px;
  // height: 40px;
}
</style>
