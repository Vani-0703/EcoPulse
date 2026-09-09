package com.ecopulse.dto; public final class AuthDtos { public record Login(String email,String password){} public record AuthResponse(String token,String email,String role){} }
