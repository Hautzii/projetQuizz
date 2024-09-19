
<button @click="editUser(u, 'email')">Modifier</button> 

<button @click="editUser(u, 'password')">Modifier</button>

<button  @click="remove(u.id)">Supprimer</button>



<!-- <div v-if="selectedUser">
      <h3>
        Modifier {{ editingField === "email" ? "l'email" : "le mot de passe" }}
      </h3>
      <form @submit.prevent="saveUser">
        <div v-if="editingField === 'email'">
          <label for="email"> Email : </label>
          <input
            type="email"
            id="email"
            v-model="updatedEmail"
            placeholder="Entrez un nouvel email"
          />
        </div>
        <div v-if="editingField === 'password'">
          <label for="password">Mot de passe :</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="updatedPassword"
            placeholder="Entrez un nouveau mot de passe"
          />
          <div>
            <input type="checkbox" id="show-password" v-model="showPassword" />
            <label for="show-password">Afficher le mot de passe</label>
          </div>
        </div>
        <!-- <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p> -->
        <!-- <button type="submit">Enregistrer les modifications</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </div> -->