import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "@nestjs/core";
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { GamesModule } from './games/games.module';
import { MaterialsModule } from './materials/materials.module';
import { UsersModule } from "./users/users.module";

const routes: Routes = [
    {
        path: 'auth',
        module: AuthModule
    },
    {
        path: 'categories',
        module: CategoriesModule
    },
    {
        path: 'games',
        module: GamesModule
    },
    {
        path: 'materials',
        module: MaterialsModule
    },
    {
        path: 'users',
        module: UsersModule
    }
];

@Module({
    imports: [
        RouterModule.register(routes),
        AuthModule,
        CategoriesModule,
        GamesModule,
        MaterialsModule,
        UsersModule
    ]
})
export class AppRoutingModule { }
