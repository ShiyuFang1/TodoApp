<template>
  <div class="dashboard">
    <v-container class="my-5">
      <!-- Tool bar -->
      <v-layout row class="mb-3" wrap>
        <v-btn
          icon
          @click="
            projects = projectsCopy;
            todos = true;
          "
        >
          <v-icon color="primary">dashboard</v-icon>
        </v-btn>

        <v-btn
          icon
          @click="
            filterProjects('complete');
            todos = false;
          "
        >
          <v-icon color="success">check_circle</v-icon>
        </v-btn>

        <v-btn
          icon
          @click="
            filterProjects('ongoing');
            todos = false;
          "
        >
          <v-icon color="warning">work</v-icon>
        </v-btn>

        <v-btn
          icon
          @click="
            filterProjects('overdue');
            todos = false;
          "
        >
          <v-icon color="error">watch_later</v-icon>
        </v-btn>
        <v-btn icon @click="showSearch = true">
          <v-icon color="secondary">search</v-icon>
        </v-btn>

        <v-text-field
          v-if="showSearch || keywords"
          label="search by project title or name"
          @blur="showSearch = false"
          v-model="keywords"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon @click="openDialog()">
          <v-icon color="primary">add_circle</v-icon>
        </v-btn>
      </v-layout>
      <!-- Add new project -->

      <v-layout row justify-center v-if="this.projects.length == 0">
        <v-layout column align-center>
          <v-btn text color="primary" class="display-1" @click="openDialog"
            >Add new Project</v-btn
          >
        </v-layout>
      </v-layout>
      <!-- Content of plan -->
      <v-card
        text
        class="pa-2"
        v-for="(project, index) in projects"
        :key="index"
      >
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs7 md4>
            <div class="caption grey--text" v-if="todos">Project Title</div>
            <div class="caption grey--text" v-if="!todos">Project Title</div>
            <div
              :class="{ 'mt-0 mb-1': $vuetify.breakpoint.smAndDown }"
              v-if="!editMode || index != indexToEdit"
            >
              {{ project.title }}
            </div>

            <v-form>
              <v-text-field
                autofocus
                :color="`${project.status}s`"
                v-model="newTitle"
                v-if="editMode && indexToEdit == index"
                class="ma-0 pa-0"
                @blur="editMode = false || updateTitle(index)"
              ></v-text-field>
            </v-form>
          </v-flex>
          <v-flex xs5 sm6 md2>
            <div class="caption grey--text">name</div>
            <div :class="{ 'mt-0 mx-0 px-0': $vuetify.breakpoint.smAndDown }">
              {{ project.name }}
            </div>
          </v-flex>

          <v-flex xs5 sm6 md2>
            <div class="caption grey--text">Due by</div>
            <div :class="{ 'mt-0 mx-0 px-0': $vuetify.breakpoint.smAndDown }">
              {{ project.due }}
            </div>
          </v-flex>

          <v-flex xs3 sm3 md2 class="pt-0">
            <div class="mt-3 pt-0">
              <v-btn
                @click="changeStatus(index)"
                text
                small
                rounded
                :class="`${project.status} white--text px-0 mx-0`"
              >
                {{ project.status }}
              </v-btn>
            </div>
          </v-flex>
          <v-spacer></v-spacer>

          <v-flex xs3 sm3 md2>
            <div class="mt-2 pt-0">
              <v-btn
                icon
                :class="`${project.status}`"
                @click="
                  editMode = !editMode;
                  indexToEdit = index;
                  newTitle = project.title;
                "
                class="pa-0 ma-0"
                ><v-icon>edit</v-icon></v-btn
              >

              <v-btn
                icon
                :class="`${project.status}`"
                @click="deleteProject(index)"
                class="pa-0 ma-0"
                ><v-icon>delete</v-icon></v-btn
              >
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus.js";

export default {
  data() {
    return {
      projects: [],
      projectsCopy: [],
      todos: true,
      userId: "",
      btnColor: "",
      snackbar: false,
      editMode: false,
      newTitle: "",
      indexToEdit: 0,
      drag: true,
      keywords: "",
      showSearch: false,
    };
  },

  mounted() {
    EventBus.$on("project-added", () => {
      this.saveOrder();
    });
    this.projects = JSON.parse(localStorage.getItem("projectsList")) || [];
    this.projectsCopy = this.projects;
  },
  watch: {
    keywords() {
      if (this.keywords) {
        let arr = this.projects.filter((item) => {
          return (
            item.title.indexOf(this.keywords) != -1 ||
            (item.name ? item.name.indexOf(this.keywords) != -1 : "")
          );
        });
        this.projects = arr;
      } else {
        this.projects = JSON.parse(localStorage.getItem("projectsList")) || [];
      }
    },
  },
  methods: {
    openDialog() {
      EventBus.$emit("dialog", true);
    },

    filterProjects(status) {
      console.log(this.projectsCopy);
      this.projects = this.projectsCopy;

      if (status === "complete") {
        this.projects = this.projects.filter(function (item) {
          return item.status === "complete";
        });
      } else if (status === "ongoing") {
        this.projects = this.projects.filter(function (item) {
          return item.status === "ongoing";
        });
      } else if (status === "overdue") {
        this.projects = this.projects.filter(function (item) {
          return item.status === "overdue";
        });
      }
    },

    changeStatus(index) {
      const currentProject = this.projects[index];
      switch (currentProject.status) {
        case "ongoing":
          var newStatus = "complete";
          var btnColor = "success";
          break;

        case "complete":
          newStatus = "overdue";
          btnColor = "error";
          break;

        case "overdue":
          newStatus = "ongoing";
          btnColor = "info";
          break;

        default:
          break;
      }
      currentProject.status = newStatus;
      this.btnColor = btnColor;
      this.updateArr();
    },

    deleteProject(index) {
      const currentProject = this.projects[index];
      this.projects.splice(index, 1);
      this.updateArr();
    },
    updateArr() {
      localStorage.setItem("projectsList", JSON.stringify(this.projects));
      this.projectsCopy = this.projects;
    },
    saveOrder() {
      let currentItem = JSON.parse(localStorage.getItem("projects"));
      this.projects.push(currentItem);
      localStorage.setItem("projectsList", JSON.stringify(this.projects));
    },
    updateTitle(index) {
      const currentProject = this.projects[index];
      currentProject.title = this.newTitle;
      this.editMode = false;
      this.updateArr();
    },
  },
};
</script>


<style>
.project.complete {
  border-left: 4px solid #3cd1c2;
}

.project.ongoing {
  border-left: 4px solid #ffaa2c;
}

.project.overdue {
  border-left: 4px solid #f83e70;
}

.theme--light.v-btn:not(.v-btn--icon).complete {
  background-color: #3cd1c2;
}

.theme--light.v-btn:not(.v-btn--icon).ongoing {
  background-color: #ffaa2c;
}

.theme--light.v-btn:not(.v-btn--icon).overdue {
  background-color: #f83e70;
}

.theme--light.v-btn.complete {
  color: #3cd1c2;
}

.theme--light.v-btn.ongoing {
  color: #ffaa2c;
}

.theme--light.v-btn.overdue {
  color: #f83e70;
}

.handle {
  cursor: move;
}
</style>