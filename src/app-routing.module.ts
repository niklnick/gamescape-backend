import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "@nestjs/core";
import { GamesModule } from './games/games.module';
import { UsersModule } from "./users/users.module";

const routes: Routes = [
    {
        path: 'games',
        module: GamesModule
    },
    {
        path: 'users',
        module: UsersModule
    }
];

@Module({
    imports: [
        RouterModule.register(routes),
        GamesModule,
        UsersModule
    ]
})
export class AppRoutingModule { }
