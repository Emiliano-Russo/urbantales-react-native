import axios, { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ITale, ITaleCreate } from "../interfaces/Tale"; // Define las interfaces según necesites
import { PaginatedResponse } from "../interfaces/PaginatedReponse";

export interface ReponseTaleRead {
  id: string;
  image: string;
  title: string;
}

export class TaleService {
  private api: AxiosInstance;

  constructor(private baseUrl: string) {
    this.api = axios.create({
      baseURL: `${baseUrl}`, // e.g., http://localhost:3000
    });
  }

  public async getTale(taleId: string): Promise<ITale> {
    const response = await this.api.get(`/tale/${taleId}`);
    return response.data;
  }

  // Asume que tienes métodos para manejar tokens y headers de autenticación como en UserService
  public async getAllTales(): Promise<PaginatedResponse<ITale[]>> {
    const response = await this.api.get("/tale");
    return response.data;
  }

  public async getAllInArea(
    latitude: number,
    longitude: number,
    diameterKm: number,
    page: number,
    limit: number,
    category: string,
    taleRead?: { hideRead: boolean; userId: string }
  ): Promise<PaginatedResponse<ITale[]>> {
    let query = `/tale/area?latitude=${latitude}&longitude=${longitude}&diameterKm=${diameterKm}&page=${page}&limit=${limit}`;
    if (category != "Any") {
      query = query + `&category=${category}`;
    }
    if (taleRead) {
      query = query + `&hideRead=${taleRead.hideRead}&userId=${taleRead.userId}`;
    }
    const response = await this.api.get(query);
    return response.data;
  }

  public async createTale(taleData: ITaleCreate): Promise<ITale> {
    const jwtToken = await AsyncStorage.getItem("token");
    console.log("creating tale jwtToken", jwtToken);

    const requestBody = {
      title: taleData.title,
      narrative: taleData.narrative,
      image: taleData.image,
      category: taleData.category,
      latitude: taleData.latitude,
      longitude: taleData.longitude,
      isAnonymous: taleData.isAnonymous ? taleData.isAnonymous : false,
      mark: taleData.mark,
    };

    const response = await this.api.post("/tale", requestBody, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json", // Esta línea generalmente no es necesaria ya que axios lo establece automáticamente
      },
    });

    return response.data;
  }

  public async likeTale(taleId: string): Promise<ITale> {
    const jwtToken = await AsyncStorage.getItem("token");
    console.log("liking tale jwtToken", jwtToken);

    const response = await this.api.post(
      `/tale/${taleId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json", // Esta línea generalmente no es necesaria ya que axios lo establece automáticamente
        },
      }
    );

    return response.data;
  }

  public async dislikeTale(taleId: string): Promise<ITale> {
    const jwtToken = await AsyncStorage.getItem("token");
    console.log("disliking tale jwtToken", jwtToken);

    const response = await this.api.post(
      `/tale/${taleId}/dislike`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json", // Esta línea generalmente no es necesaria ya que axios lo establece automáticamente
        },
      }
    );

    return response.data;
  }

  public async reportTale(taleId: string, reason: string): Promise<ITale> {
    const jwtToken = await AsyncStorage.getItem("token");
    console.log("reporting tale jwtToken", jwtToken);

    const response = await this.api.post(
      `/tale/${taleId}/report`,
      {
        reason: reason,
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json", // Esta línea generalmente no es necesaria ya que axios lo establece automáticamente
        },
      }
    );

    return response.data;
  }

  public async markAsRead(taleId: string): Promise<ITale> {
    const jwtToken = await AsyncStorage.getItem("token");
    console.log("marking tale as read jwtToken", jwtToken);

    const response = await this.api.post(
      `/tale/${taleId}/read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json", // Esta línea generalmente no es necesaria ya que axios lo establece automáticamente
        },
      }
    );

    return response.data;
  }

  public async getMyReads(): Promise<ReponseTaleRead[]> {
    const jwtToken = await AsyncStorage.getItem("token");
    const response = await this.api.get(`/tale/user-reads`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response.data;
  }

  public async getMyFavorites(): Promise<any> {
    const jwtToken = await AsyncStorage.getItem("token");
    const response = await this.api.get(`/tale/user-liked`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response.data;
  }

  public async getMyTales(): Promise<any> {
    const jwtToken = await AsyncStorage.getItem("token");
    const response = await this.api.get(`/tale/user-tales`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response.data;
  }

  public async getTopLiked(): Promise<any> {
    const response = await this.api.get(`/tale/top-liked`);
    return response.data;
  }
}

// No olvides crear las interfaces adecuadas en `../interfaces/Tale` basadas en la estructura de tus datos.
