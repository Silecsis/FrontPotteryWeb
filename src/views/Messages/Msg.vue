<!--
  Vista Mensajes.
  Dibuja la bandeja de mensajes del usuario.
  Filtra los mensajes
  Solo pueden acceder los usuarios logados a su propia bandeja de mensajes
-->
<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <message :message="message" :type="messageType" />

      <!-- Cuadro de mensajes -->
      <div
        class="items-center bg-white rounded p-5 my-2 min-w-min overscroll-auto min-w-max"
      >
        <!-- Lista de opciones -->
        <div
          class="flex justify-center block col-span-2 bg-gray-200 rounded w-full p-2 my-1"
        >
          <!--Opciones -->
          <div class="w-1/3">
            <button-icon type="remove" class="font-bold inline-flex">
            </button-icon>

            <button-icon
              v-if="this.show == 'received'"
              type="sended"
              class="font-bold inline-flex"
              @click.native="changeShow('sended')"
            >
            </button-icon>

            <button-icon
              v-if="this.show == 'sended'"
              type="received"
              class="font-bold inline-flex"
              @click.native="changeShow('received')"
            >
            </button-icon>
          </div>

          <!-- BUSCADOR  -->
          <div class="w-2/3">
            <input
              name="buscaTitle"
              class="form-control mr-sm-2 rounded bg-white w-40"
              type="search"
              placeholder="Por asunto"
              aria-label="Search"
              v-model="searchForm.buscaTitle"
              v-on:keyup.enter="search"
            />

            <select
              name="buscaRead"
              class="form-control ml-2 mr-sm-2 rounded bg-white"
              v-model="searchForm.buscaRead"
              @change="search()"
            >
              <option disabled value="">Mostrar</option>
              <option value="">Todos</option>
              <option value="no">Sin leer</option>
              <option value="si">Leidos</option>
            </select>

            <select
              name="buscaUser"
              class="form-control ml-2 mr-sm-2 rounded bg-white"
              v-model="searchForm.buscaUser"
              @change="search()"
            >
              <option disabled value="">Usuario</option>
              <option value="">Todos</option>
              <option v-for="u in users" v-bind:key="u.id" :value="u.id">
                {{ u.email }}
              </option>
            </select>

            <input
              name="buscaFechaLogin"
              class="form-control ml-2 mr-sm-2 rounded bg-white"
              type="date"
              placeholder="Por fecha de creación"
              aria-label="Search"
              v-model="searchForm.buscaFechaLogin"
              @change="search()"
            />
          </div>
        </div>

        <!-- PAGINACION-->
        <div class="pt-1">
          <!--SELECCION DE PAGINACION-->
          <div class="inline-flex w-1/2">
            <dropdown>
              <template v-slot:trigger>
                <button
                  class="flex items-center bg-white mr-sm-2 px-6 rounded text-gray-600 font-bold border-2 border-gray-400"
                >
                  Mostrar {{ pageSize }} por página
                  <div class="ml-1">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </button>
              </template>
              <template v-slot:content>
                <dropdown-link @click.native="pageSize = 4">
                  Paginación de 4
                </dropdown-link>
                <dropdown-link @click.native="pageSize = 6">
                  Paginación de 6
                </dropdown-link>
                <dropdown-link @click.native="pageSize = 8">
                  Paginación de 8
                </dropdown-link>
                <dropdown-link @click.native="pageSize = 10">
                  Paginación de 10
                </dropdown-link>
              </template>
            </dropdown>
          </div>

          <!-- PAGINACION CON VUE-PAGINATE -->
          <div class="inline-flex w-1/2">
            <paginate
              ref="paginator"
              name="msgs"
              :list="msgs"
              :per="pageSize"
            />
            <paginate-links
              for="msgs"
              :limit="4"
              :show-step-links="true"
            ></paginate-links>
          </div>
        </div>

        <!-- Tratamiento de mensajes -->
        <div class="h-80 mt-3">
          <!-- Lista de mensajes -->
          <div
            class="h-full flex justify-center overflow-hidden shadow-sm border-2 border-gray-400 inline-flex rounded bg-indigo-200 w-1/3 p-2"
          >
            <ul v-if="msgs.length != 0" class="w-full">
              <li class="flex justify-center">
                <u
                  ><h3 class="text-gray-600 font-bold uppercase m-2">
                    Lista de mensajes
                    <span v-if="this.show == 'received'"> recibidos</span>
                    <span v-if="this.show == 'sended'"> enviados</span>
                  </h3></u
                >
              </li>
              <li
                v-for="msg in paginated('msgs')"
                v-bind:key="msg.id"
                @click="showId(msg.id)"
                :id="msg.id"
                class="rounded w-full p-2 border-2 border-gray-200 overflow-auto"
                :class="{
                  'bg-gray-300': selectMsg == msg.id,
                  'bg-white': selectMsg != msg.id,
                }"
              >
                <input
                  type="checkbox"
                  class="inline-flex pt-1 rounded form-checkbox h-4 w-4 mr-2 text-orange-600"
                  name="msgSelected"
                />
                <p class="inline-flex font-bold w-20">
                  {{ msg.title }}
                  <span class="font-extralight pl-2"
                    >({{ msg.emailUser }})</span
                  >
                </p>
              </li>
            </ul>

            <ul v-else class="w-full">
              <li class="flex justify-center">
                <u
                  ><h3 class="text-gray-600 font-bold uppercase m-2">
                    Lista de mensajes
                    <span v-if="this.show == 'received'"> recibidos</span>
                    <span v-if="this.show == 'sended'"> enviados</span>
                  </h3></u
                >
              </li>
              <li class="rounded bg-white w-full p-2 border-2 border-gray-200">
                <p class="inline-flex font-bold text-red-600 text-lg">
                  {{ errorTabla }}
                </p>
              </li>
            </ul>
          </div>

          <!-- Desarrollo de opciones CRUD -->
          <div
            class="h-full flex justify-center overflow-hidden shadow-sm border-2 border-gray-400 inline-flex rounded bg-blue-100 w-2/3 p-2"
          >
            <div
              v-if="this.hiddenWindow"
              class="flex justify-center bg-blue-100 w-full flex m-2 rounded"
            >
              <!-- Este div es necesario o sino se descuadra la vista -->
              <p class="text-blue-100">hi</p>
            </div>

            <div
              v-if="!this.hiddenWindow"
              class="flex block justify-left bg-white w-full m-2 rounded"
            >
              <ul class="px-2 w-full">
                <li class="text-white"> .</li>
                <li v-if="this.show == 'received'" class="justify-center font-bold text-xs pb-2"><u class="text-gray-500">De:</u> <spand class="font-extralight">{{ this.msg.emailUser }}</spand></li>
                <li v-if="this.show == 'sended'" class="justify-center font-bold text-xs pb-2"><u class="text-gray-500">De:</u> <spand class="font-extralight">{{ this.msg.emailUser }}</spand></li>
                <li class="justify-center font-bold text-center text-xl text-white rounded bg-blue-400 p-1 mb-2">{{ this.msg.title }}</li>
                <li class="justify-center ">{{ this.msg.msg }}</li>
                <li class="text-white"> .</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import LinkButton from "../components/linkButton.vue";
import Dropdown from "../components/dropdown";
import DropdownLink from "../components/dropdown-link";
import NavLink from "../components/nav-link";
import ButtonIcon from "../components/button-icon";
import VButton from "../components/v-button";
import Message from "../components/message";
import ImageServer from "../components/image-server.vue";
import Commons from "../../helpers/commons";

export default {
  components: {
    LinkButton,
    DropdownLink,
    Dropdown,
    NavLink,
    ButtonIcon,
    Message,
    ImageServer,
    VButton,
  },
  created() {
    this.$store.commit("SET_TITLE", "Bandeja de mensajes");
  },
  data: function () {
    return {
      users: [],
      user: null,
      msgs: [],
      msg: null,
      paginate: ["msgs"],
      message: null,
      messageType: null,
      errorTabla: "",
      pageSize: 4,
      searchForm: {},
      reload: false,
      show: "received",
      hiddenWindow: true,
      selectMsg: "",
    };
  },
  mounted() {
    this.searchForm = { buscaRead: "", buscaUser: "" };
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.search();
  },
  methods: {
    destroy: function (id) {},
    edit: function (id) {},
    detail: function (id) {},
    search: function () {
      let config = {
        params: this.searchForm,
      };

      axios
        .get(
          `${process.env.VUE_APP_API}/messages/${this.show}/${this.user.id}`,
          config
        )
        .then((result) => {
          this.msgs = result.data.msgs.filter((msg) => {
            msg.created_at = msg.created_at.substring(0, 10); //Modificacion
            return true; //True porque quiero que me devueva. Si fuera al contrario, pondria false
          });

          this.users = result.data.users;

          if (this.msgs.length == 0) {
            this.errorTabla = "No existen mensajes";
            this.reload = true;
          } else {
            if (this.reload) {
              location.reload();
            }
          }
        })
        .catch((error) => {
          if (error.response.message == "Unauthenticated.") {
            Commons.showError(this, "No estás autorizado para esta vista");
            this.$store.commit("SET_TITLE", "Mensajes --> Error");
            this.auth = false;
          } else {
            this.msgs = [];
            this.errorTabla = "Ha ocurrido un error inesperado";
          }
        });
    },
    changeShow: function (option) {
      this.show = option;
      this.hiddenWindow = true;
      this.msg = null;
      this.search();
    },
    showId: function (idMsg) {
      if (this.selectMsg == "") {
        this.selectMsg = idMsg;
        this.hiddenWindow = false;
        this.getMsg(idMsg);
      } else if (this.selectMsg != idMsg && this.selectMsg != "") {
        this.selectMsg = idMsg;
        this.hiddenWindow = false;
        this.getMsg(idMsg);
      }
    },
    getMsg: function (idMsg) {
      this.msgs.forEach((m) => {
        if (m.id == idMsg) {
          this.msg = m;
        }
      });
    },
  },
};
</script>
