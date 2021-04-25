/*Fichero de métodos comunes de las vistas*/
import axios from "axios";

const commons = {
    showError: function ($this, msg) {
        $this.messageType = "error";
        $this.message = msg;
    },
    showSuccess: function ($this, msg) {
        $this.messageType = "success";
        $this.message = msg;
    },
    destroy: function ($this, path, id, model, msgEmpty) {
        axios
            .delete(`${process.env.VUE_APP_API}/${path}/${id}`)
            .then((result) => {
                if (result.data.success) {
                    commons.showSuccess($this, result.data.message);
                    $this[model] = $this[model].filter((item) => {
                        return item.id != id; //Para que no liste el usuario que se ha borrado
                    });

                    if ($this[model].length == 0) {
                        $this.errorTabla = msgEmpty;
                    }
                } else {
                    commons.showError($this, result.data.message);
                }
            })
            .catch((error) => {
                if (error.response) {
                    commons.showError($this, error.response.data.message);
                } else {
                    commons.showError($this, "Ha ocurrido un error inesperado");
                }
            });
    },
    search: function ($this, path, model, msgEmpty, breadcrumbs) {

        let config = {
            params: $this.searchForm,
        };
        axios
            .get(`${process.env.VUE_APP_API}/${path}`, config)
            .then((result) => {
                $this[model] = result.data.filter((item) => {
                    item.created_at = item.created_at.substring(0, 10); //Modificacion
                    return true; //True porque quiero que me devueva. Si fuera al contrario, pondria false
                });

                if ($this[model].length == 0) {
                    $this.errorTabla = msgEmpty;
                }
            })
            .catch((error) => {
                if (error.response.data.message == "Unauthenticated." ||
                    error.response.data.error == 'Unauthorised') {
                    commons.showError($this, "No estás autorizado para esta vista");
                    $this.$store.commit("SET_TITLE", `${breadcrumbs} --> Error`);
                    $this.auth = false;
                } else {
                    $this[model] = [];
                    $this.errorTabla = "Ha ocurrido un error inesperado";
                }
            });
    },
    save: function ($this, action, path, model, msgSuccess, validate, clear) {
        let actionMethod = axios.post;
        let url = `${process.env.VUE_APP_API}/${path}`;

        if (!validate(model)) {
            return;
        }

        if (action == 'edit') {
            let id = $this.$route.params.id;
            actionMethod = axios.put;
            url = `${url}/${id}`;
        }

        //actionMethod sería axios.put o axios.post
        //es lo mismo que poner (ejemplo de crear):
        //axios.post(`${process.env.VUE_APP_API}/users`,this.user).tal tal tal
        actionMethod(url, model)
            .then((result) => {
                commons.showSuccess($this, msgSuccess);

                //Si se ha pasado el parametro clear y es una función.
                if (typeof clear == 'function') {
                    clear();
                }

            })
            .catch((error) => {
                if (error.response.data.errors) {
                    for (let fieldError in error.response.data.errors) {
                        $this.error[fieldError] = error.response.data.errors[fieldError];
                    }
                } else if (error.response) {
                    commons.showError($this, error.response.data.message);
                } else {
                    commons.showError($this, "Ha ocurrido un error inesperado");
                }
            });
    },
    loadForm: function ($this, path, modelName, breadcrumbs) {
        let id = $this.$route.params.id;

        axios
            .get(`${process.env.VUE_APP_API}/${path}/${id}`)
            .then((result) => {
                $this[modelName] = result.data.data;
            })
            .catch((error) => {
                $this[modelName] = {};

                if (error.response.data.message == "Unauthenticated." ||
                    error.response.data.error == 'Unauthorised') {
                    commons.showError($this, "No estás autorizado para esta vista");

                    if (breadcrumbs) {
                        $this.$store.commit("SET_TITLE", `${breadcrumbs} --> Error`);
                    }

                    $this.auth = false;
                } else {
                    commons.showError($this, 'Ha ocurrido un error inesperado');
                }

            });
    },
};

export default commons;